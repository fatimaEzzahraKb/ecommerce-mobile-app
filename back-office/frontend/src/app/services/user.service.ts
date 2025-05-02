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
}
