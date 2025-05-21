import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Browser } from 'protractor';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  book = {
    titre: "",
    auteur: "",
    prix: null,
    description: "",
    image: ""
  }

  bookList : any[] = [];

  books : any[] = [];

  selectedFile : File | null = null;

  constructor(private bookService: ProductService) { }

  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next : (res) => {
        this.bookList.push({...this.book});
        this.book = {titre: '', auteur: '', prix: null, description: '', image: ''};
      },
      error : (err) => console.error(err)
    })
  }

  onSelectedFile(event: any) {
    console.log("onSelectedFile appelé", event);
    const file: File = event.target.files[0];
    if(file) {
      this.selectedFile = file;
      console.log("fichier selectionné", file);
    }

  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    })
  }

}
