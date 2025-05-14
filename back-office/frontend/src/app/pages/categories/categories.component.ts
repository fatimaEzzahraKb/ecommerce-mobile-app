import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

   categoriesArray: any[] = [];
    constructor(private categorySrv: CategoryService) {
    }
    getCategories() {
      this.categorySrv.loadCategories().subscribe((res: any) => {
        this.categoriesArray = res.categories;
        console.log(this.categoriesArray);
      })
    }
    deleteCategory(id: number) {
      Swal.fire({
        title:"Are you Sure?",
        text:"You won't be able to revert the user!",
        icon:"warning",
        showCancelButton:true,
        confirmButtonText:"Yes, delete it!"
      }).then((result)=>{
        if(result.isConfirmed){
        this.categorySrv.delete(id).subscribe(
          (res: any) => {
            
            console.log(res.status);
            this.getCategories();
            
          },
          (err)=>{
            Swal.fire('Error',"Failed to Delete the user","error")
            console.log("Error:",err)
          }
        );}
      })
      
    }
    ngOnInit(): void {
      this.getCategories();
    }
  

}
