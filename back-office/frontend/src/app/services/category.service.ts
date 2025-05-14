import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl : string = "http://localhost:3000/categories/";
  constructor(private http:HttpClient) { }
  loadCategories(){
    return this.http.get(this.apiUrl);
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  show(id:number){
    return this.http.get(`${this.apiUrl}${id}`);
  }
}
