import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(this.apiUrl);
  }

  deleteOrder(id:number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  showOrder(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editOrder(id: number, orderData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, orderData);
  }

}
