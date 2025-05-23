import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal-product',
  templateUrl: './edit-modal-product.component.html',
  styleUrls: ['./edit-modal-product.component.css']
})
export class EditModalProductComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  constructor() {};

  ngOnInit(): void {
  }

}
