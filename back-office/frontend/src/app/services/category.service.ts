import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl : string = "http://localhost:3000/categories/";
  constructor(private http:HttpClient) { }
  loadCategories(){
    return this.http.get(this.apiUrl);
  }
  add(category:Category){
    return this.http.post(this.apiUrl,category,{observe:'response'});
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  edit(id:number,catData:Category){
    debugger;
    return this.http.put(`${this.apiUrl}${id}`,catData);
  }
  show(id:number){
    console.log("show",id)
    return this.http.get(`${this.apiUrl}${id}`);
  }

}
