import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  ordersArray: any[] = [];

  ordersTablePage: any[] = [];
  pagesAmount:number[]=[];
  pages:number = 0;
  ordersPerPage:number =5;
  currentPage:number = 1;
  modalRef: any;

  editForm = new FormGroup({
      tel: new FormControl(null, [Validators.required]),
      adress: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      ville: new FormControl("", [Validators.required]),
      total: new FormControl(null, [Validators.required]),
  })

  selectedOrder: any[] = [];

  constructor(private orderService: OrderService, private modalService: NgbModal,
    private cdr: ChangeDetectorRef) { }

  getOrders() {
    this.orderService.getOrders().subscribe((res: any) => {
      this.ordersArray = res.orders;
      this.pages =Math.floor(this.ordersArray.length / this.ordersPerPage)+1;
      this.pagesAmount = Array.from({length:this.pages},(_,i)=>i+1);
      this.ordersTablePage = this.ordersArray.slice(0,5);
      console.log(this.getOrders);
    })
  }

  deleteOrder(id: number) {
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
        this.orderService.deleteOrder(id).subscribe({
          next: res => {
            this.getOrders();
          },
          error: err => {
            console.error("Erreur lors de la suppression", err);
          }
        });
      }
    })
  }

  openDetailModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }

  close() {
    this.modalRef.close();
  }


  openEditModal(template: TemplateRef<any>, order: any) {
    this.selectedOrder = order,
      this.editForm.patchValue({
        tel: order.tel,
        adress: order.adress,
        status: order.status,
        total: order.total,
        ville: order.ville,
      })
    this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }

  editOrder(id: number) {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid){
      return;
    }

   const updatedOrder = this.editForm.value;

    this.orderService.editOrder(id,updatedOrder).subscribe((res: any) => {
      console.log(res.status);
      Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: "Livre Modifiée succès",
              timer: 2000,
            })
            this.getOrders();
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

  ngOnInit(): void {
    this.getOrders();
  }
// Pagination

  paginate(page:number){
    const start = (page-1)*this.ordersPerPage;
    const end =page * this.ordersPerPage;
    this.ordersTablePage = this.ordersArray.slice(start,end);
    this.currentPage = page;
  }
  PrevNext(path:string){
    this.currentPage= path==="prev" ? this.currentPage-1 : this.currentPage+1;
    const start = (this.currentPage-1)*this.ordersPerPage;
    const end =this.currentPage * this.ordersPerPage;
    this.ordersTablePage = this.ordersArray.slice(start,end);
  }
}
