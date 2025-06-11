import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }

  getAllUserCarts(){
    return this.http.get(this.apiUrl);
  }

  removeBookFromCart(userId: number, bookId: number) {
    return this.http.delete(`${this.apiUrl}/${userId}/${bookId}`);
  }
}
