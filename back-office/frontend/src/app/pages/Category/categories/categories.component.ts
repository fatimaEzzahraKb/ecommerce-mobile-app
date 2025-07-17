import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesArray: any[] = [];
  categoriesTablePage: any[] = [];
  pagesAmount:number[]=[];
  pages:number = 0;
  categoriesPerPage:number =5;
  currentPage:number = 1;
  newCategory: Category;
  addFormErrors: any[] = [];
  editFormErrors: any[] = [];
   modalRef!: NgbModalRef;
  constructor(private categorySrv: CategoryService, private modalService: NgbModal, private cdr: ChangeDetectorRef) {
  }
  addForm: FormGroup = new FormGroup({
    nom: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])
  });
  editForm: FormGroup = new FormGroup({
    nom: new FormControl("", [Validators.required]),
    description: new FormControl("")
  });
  getCategories() {
    this.categorySrv.loadCategories().subscribe((res: any) => {
      this.categoriesArray = res.categories;
      this.pages =Math.floor(this.categoriesArray.length / this.categoriesPerPage)+1;
      this.pagesAmount = Array.from({length:this.pages},(_,i)=>i+1);
      this.categoriesTablePage = this.categoriesArray.slice(0,5);
    })
  }
  deleteCategory(id: number) {
    Swal.fire({
      title: "Ête vous sûre ?",
      text: "Vous ne pourrez pas retourner la catégorie!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorySrv.delete(id).subscribe(
          (res: any) => {

            this.getCategories();

          },
          (err) => {
            Swal.fire('Error', "Failed to Delete the user", "error")
            console.log("Error:", err)
          }
        );
      }
    })

  }
  openAddModal(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }
  @ViewChild('editModal') editModal: TemplateRef<any>;
  openEditModal(content:any,category:any){
    this.editForm.patchValue({
      nom: category.nom,
      description: category.description
    });
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false });

  }
  addCategory() {
    this.categorySrv.add(this.addForm.value).subscribe((res: any) => {
      console.log(res.status)
      this.addFormErrors = [];
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: "Catégorie ajoutée avec succès",
        timer: 2000,
      })
      this.getCategories();
      this.close();
      this.addForm.reset()

    }, (err) => {
      console.log(err)
      if (err.status === 422) {
        this.addFormErrors = err.error.errors;
        console.log(this.addFormErrors);
        this.cdr.detectChanges();


      }
      else if (err.status == 500) {
        console.log('Erreur du serveur', err)
        Swal.fire('Error', 'Something went wrong', 'error')
      }
    })
  }
  editCategory(id: number) {
    console.log(id)
    this.categorySrv.edit(id,this.editForm.value).subscribe((res: any) => {
      console.log(res.status)
      this.editFormErrors = [];
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: "Catégorie Modifiée succès",
        timer: 2000,
      })
      this.getCategories();
      this.close();
      this.addForm.reset()

    }, (err) => {
      console.log(this.editForm.value)
      if (err.status === 422) {
        this.editFormErrors = err.error.errors;
        console.log(this.editFormErrors);
        this.cdr.detectChanges();
      }
      else if (err.status == 500) {
        this.editFormErrors = [];
        console.log('Erreur du serveur', err)
        Swal.fire('Error', 'Something went wrong', 'error')
      }
    })
  }
  close() {
    this.modalRef.close();
  }
  ngOnInit(): void {
    this.getCategories();
  }

  paginate(page:number){
    const start = (page-1)*this.categoriesPerPage;
    const end =page * this.categoriesPerPage;
    this.categoriesTablePage = this.categoriesArray.slice(start,end);
    this.currentPage = page;
  }
  PrevNext(path:string){
    this.currentPage= path==="prev" ? this.currentPage-1 : this.currentPage+1;
    const start = (this.currentPage-1)*this.categoriesPerPage;
    const end =this.currentPage * this.categoriesPerPage;
    this.categoriesTablePage = this.categoriesArray.slice(start,end);
  }
}
