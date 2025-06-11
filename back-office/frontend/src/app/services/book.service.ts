import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  addBook(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
  
  getBooks() {
    return this.http.get<{ books: any[] }>(this.apiUrl); 
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateBook(id: number,formData: FormData) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    formData
  );
}

  
  
}
