import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  notFound: boolean = false;
  constructor(private categorySrv:CategoryService,private route:ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get('id');
    console.log("init",id)
    this.getCategoryDetails(parseInt(id));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("init",id)
    this.getCategoryDetails(parseInt(id));
  }
  getCategoryDetails(id:number){
    console.log("get",id)
    this.categorySrv.show(id).subscribe(
      (res:any)=>{
        if(res.status===404){
          this.notFound = true;
          console.log(res.message);
        }
        else{
         this.category = res.category;
         this.books = res.category.books;
         console.log(this.category)
         console.log("res: ",res.category)
        }
      },(err)=>{
        console.log('There is an error  in the server',err)
      }
    )
  }

}
