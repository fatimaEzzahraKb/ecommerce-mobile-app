import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order :any | null = null ;
  notFound: boolean = false;

  constructor(private http:HttpClient, private orderService: OrderService,
    private route: ActivatedRoute
  ) { }


  getOrderDetails(id: number) {
    this.orderService.showOrder(id).subscribe(
      (res:any)=>{
        if(res.status===404){
          this.notFound = true;
        }
        else{
         this.order = res.order;
        }
      },(err)=>{
        console.log('There is an error  in the server',err)
      }
    )
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getOrderDetails(parseInt(id));
  }

}
