import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  orderId: number | null = null;
  order: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get(`http://localhost:3000/orders/details/${this.orderId}`).subscribe({
      next: (data: any) => {
        this.order = data; // ✅ fixer ici
        console.log('Commande récupérée :', this.order);
      },
      error: (err) => console.error(err)
    });
  }
}
