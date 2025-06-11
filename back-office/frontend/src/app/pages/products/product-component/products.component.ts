import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit, inject, Input, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ProductsComponent implements OnInit {

  modalRef: any;

  books: any[] = [];

  page: number = 1;

  bookForm: FormGroup = new FormGroup({
    titre: new FormControl("", [Validators.required]),
    auteur: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    prix: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),
    categories: new FormControl([], [Validators.required]),


  });

  onCategoryChange(event: any) {
    const selectedCategories = this.bookForm.get('categories')!.value || [];
    const categoryId = +event.target.value;
    if (event.target.checked) {
      if (!selectedCategories.includes(categoryId)) {
        selectedCategories.push(categoryId);
      }
    } else {
      const index = selectedCategories.indexOf(categoryId);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }
    this.bookForm.get('categories')!.setValue(selectedCategories);
    this.bookForm.get('categories')!.markAsDirty();
  }



  editForm = new FormGroup({
    titre: new FormControl("", [Validators.required]),
    auteur: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    prix: new FormControl("", [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    categories: new FormControl([], [Validators.required])
  })

  selectedFile: File | null = null;

  selectedBook: any = null;

  categories: any[] = [];




  // private modalService = inject(NgbModal);


  constructor(
    private bookService: BookService,
    private modalService: NgbModal, private cdr: ChangeDetectorRef,
    private categoryService: CategoryService
  ) {

  }

  getCategories() {
    this.categoryService.loadCategories().subscribe(
      (res: any) => {
        this.categories = res.categories;
        console.log('Catégories chargées :', this.categories);
      },
      error => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }


  openEditModal(template: TemplateRef<any>, book: any) {
    this.selectedBook = book,
      this.editForm.patchValue({
        titre: book.titre,
        auteur: book.auteur,
        description: book.description,
        prix: book.prix,
        image: book.image,
        categories: book.categories.map((c: any) => c.id)
      })
    this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  editBook(id: number) {

    this.editForm.markAllAsTouched();

    if (this.editForm.invalid || !this.onFileChange) {
      return;
    }

    console.log(id);
    const formData = new FormData();
    formData.append("titre", this.editForm.value.titre);
    formData.append("auteur", this.editForm.value.auteur);
    formData.append("description", this.editForm.value.description);
    formData.append("prix", this.editForm.value.prix);

    const categories = this.editForm.value.categories;
    formData.append("categories", JSON.stringify(categories));


    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }
    this.bookService.updateBook(id, formData).subscribe((res: any) => {
      console.log(res.status);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: "Livre Modifiée succès",
        timer: 2000,
      })
      this.getAllBooks();
      this.close();

    }, (err) => {
      console.log(err)
      if (err.status === 422) {
        this.cdr.detectChanges();
      }
      else if (err.status == 500) {
        console.log('Erreur du serveur', err)
        Swal.fire('Error', 'Something went wrong', 'error')
      }
    })

  }

  onEditCategoryChange(event: any): void {
    const selectedCategories = this.editForm.get('categories')!.value || [];
    const categoryId = +event.target.value;

    if (event.target.checked) {
      if (!selectedCategories.includes(categoryId)) {
        selectedCategories.push(categoryId);
      }
    } else {
      const index = selectedCategories.indexOf(categoryId);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }

    this.editForm.get('categories')!.setValue(selectedCategories);
    this.editForm.get('categories')!.markAsDirty();
  }


  close() {
    this.modalRef.close();
  }

  onSelectedFile(event: any) {
    console.log("onSelectedFile appelé", event);
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("fichier selectionné", file);
    }

  }

  onUserSave() {
    this.bookForm.markAllAsTouched();

    if (this.bookForm.invalid || !this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('titre', this.bookForm.value.titre!);
    formData.append('auteur', this.bookForm.value.auteur!);
    formData.append('description', this.bookForm.value.description!);
    formData.append('prix', this.bookForm.value.prix!.toString());
    formData.append('image', this.selectedFile);

    const selectedCategories: number[] = this.bookForm.value.categories;

    if (selectedCategories && selectedCategories.length > 0) {
      selectedCategories.forEach(catId => {
        formData.append('categories[]', catId.toString());
      });
    }

    this.bookService.addBook(formData).subscribe({
      next: res => {
        console.log("Livre ajouté", res);
        alert("Livre ajouté avec succès !");
        this.bookForm.reset();
        this.getAllBooks();
      },
      error: err => {
        console.error("Erreur", err);
        alert("Erreur lors de l'ajout");
      }


    });
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe({
      next: data => {
        if (data && data.books) {
          this.books = data.books;
          console.log("Livres récupérés :", this.books);
        } else {
          console.warn("Structure inattendue :", data);
          this.books = [];
        }
      },
      error: err => {
        console.error("Erreur lors du chargement des livres", err);
      }
    });
  }

  onDeleteBook(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: res => {
            this.getAllBooks();
          },
          error: err => {
            console.error("Erreur lors de la suppression", err);
          }
        });

      }
    })
  }

  getCategoryNames(categories: any[]): string {
    if (!categories || categories.length === 0) {
      return "Aucune catégorie";
    }
    return categories.map(c => c.nom).join(', ');
  }

  openDetailModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }










  ngOnInit(): void {
    this.getAllBooks();
    this.getCategories();
  }

}
