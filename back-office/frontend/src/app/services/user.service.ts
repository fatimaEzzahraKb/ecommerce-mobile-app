import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl : string = "http://localhost:3000/users/";
  constructor(private http:HttpClient) { }
  loadUsers(){
    return this.http.get(this.apiUrl);
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  show(id:number){
    return this.http.get(`${this.apiUrl}${id}`);
  }
  update(id:number,newData:any){
    return this.http.put(`${this.apiUrl}${id}`,newData,{observe:'response'})
  }
  changePassword(id:number,newData:any){
    return this.http.post(`${this.apiUrl}changePassword/${id}`,newData,{observe:'response'})
  }
}
