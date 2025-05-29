import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {
  
  category :any | null = null ;
  books : any[] = [];
  bookForm: FormGroup;
   addFormErrors: any[] = [];
  selectedImage: File | null = null;
  notFound: boolean = false;
  modalRef:any;
  constructor(private categorySrv:CategoryService,private route:ActivatedRoute,private modalService :NgbModal) { 
    const id = this.route.snapshot.paramMap.get('id');
    this.getCategoryDetails(parseInt(id));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCategoryDetails(parseInt(id));
  this.bookForm = new FormGroup({
  titre: new FormControl<string | null>(null, [Validators.required]),
  description: new FormControl<string | null>(null, [Validators.required]),
  auteur: new FormControl<string | null>(null, [Validators.required]),
  prix: new FormControl<number | null>(null, [Validators.required])
});
  }
  getCategoryDetails(id:number){
    this.categorySrv.show(id).subscribe(
      (res:any)=>{
        if(res.status===404){
          this.notFound = true;
        }
        else{
         this.category = res.category;
         this.books = res.category.books;
        }
      },(err)=>{
        console.log('There is an error  in the server',err)
      }
    )
  }
  openAddModal(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }
  close(){
    this.modalRef.close();
  }
  onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      this.selectedImage = file;
    console.log(this.selectedImage)
    }
  }
  addBook(){
    if(this.bookForm.invalid || !this.selectedImage){
      console.log("Form invalid");
      return ;
    }
    const formData = new FormData();
    formData.append("titre",this.bookForm.get("titre")?.value)
    formData.append("auteur",this.bookForm.get("auteur")?.value)
    formData.append("description",this.bookForm.get("description")?.value)
    formData.append("prix",this.bookForm.get("prix")?.value)
    formData.append("image",this.selectedImage);
    
  }
}
