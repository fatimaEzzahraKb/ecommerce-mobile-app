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
      console.log(this.categoriesArray);
    })
  }
  deleteCategory(id: number) {
    Swal.fire({
      title: "Are you Sure?",
      text: "You won't be able to revert the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorySrv.delete(id).subscribe(
          (res: any) => {

            console.log(res.status);
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
    console.log(this.addForm.value)
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


}
