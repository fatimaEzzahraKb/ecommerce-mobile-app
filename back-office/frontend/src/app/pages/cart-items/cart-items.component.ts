import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItemsService } from 'src/app/services/cart-items.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cartItemsArray: any[] = [];

  modalRef: any;

  constructor(private cartItems: CartItemsService, private modalService: NgbModal) { }

  getCartItems() {
    this.cartItemsArray = [];
    this.cartItems.getAllUserCarts().subscribe((res: any) => {
      const users = res.cartItems;

      users.forEach((user: any) => {
        user.books.forEach((book: any) => {
          this.cartItemsArray.push({
            userId: user.id,
            nom: user.nom,
            email: user.email,
            prenom: user.prenom,
            ville: user.ville,
            pays: user.pays,
            bookId: book.id,
            titre: book.titre,
            prix: book.prix,
            auteur: book.auteur,
            quantite: book.cartItems?.quantite,
            categories: book.categories?.map((cat: any) => cat.nom) 
          });
        });
      });
    })


  }


  deleteCartItem(userId: number, bookId: number) {
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
        this.cartItems.removeBookFromCart(userId, bookId).subscribe({
          next: res => {
            this.getCartItems();
          },
          error: err => {
            console.error("Erreur lors de la suppression", err);
          }

        })

      }
    })

  }

  openDetailModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }

  close() {
    this.modalRef.close();
  }

  ngOnInit(): void {
    this.getCartItems()
  }

}
