import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';
  private baseUrl = 'http://192.168.1.109:3000/books';

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

  updateBook(id: number, formData: FormData) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      formData
    );
  }
  startScan(book_id: number, device_id: number) {
    return this.http.post(`${this.apiUrl}/start-scan`, { book_id, device_id });
  }
  endScan(device_id: number) {
    return this.http.post(`${this.apiUrl}/end-scan`, { device_id });
  }


 

  getHistory(): Observable<any>{
    return this.http.get(`${this.baseUrl}/history`);
    
  }


}
