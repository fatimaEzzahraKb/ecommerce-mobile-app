import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   apiUrl : string = "http://localhost:3000/dashboard/";

  constructor(private http:HttpClient) {}
  loadData(){
    return this.http.get(this.apiUrl);
  }
}
