import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public totalSales: number = 0;
  public totalCustomers: number = 0;
  public totalBooks: number = 0;
  public totalOrders: number = 0;
  public topBooksChartData: any[] = [];
  public topBooksChartLabels: any[] = [];
  public salesChartData: any[] = [];
  public salesChartLabels: any[] = [];
  constructor(private dashboardSrv: DashboardService) { }
  ngOnInit() {
    this.getData();
    parseOptions(Chart, chartOptions());
  }

  renderTopBooksChart() {
  const chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement;

  new Chart(chartOrders, {
    type: 'bar',
    data: {
      labels: this.topBooksChartLabels,
      datasets: [{
        label: 'Livres vendus',
        data: this.topBooksChartData,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}
renderSalesChart() {
  const chartSales = document.getElementById('chart-sales') as HTMLCanvasElement;

  this.salesChart = new Chart(chartSales, {
    type: 'line',
    data: {
      labels: this.salesChartLabels,
      datasets: [{
        label: 'Ventes mensuelles',
        data: this.salesChartData,
        borderColor: '#5e72e4',
        backgroundColor: 'rgba(94, 114, 228, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  getData() {
    this.dashboardSrv.loadData().subscribe((res: any) => {
      this.totalSales = res.salesTotal;
      this.totalCustomers = res.customersTotal;
      this.totalBooks = res.booksTotal;
      this.totalOrders = res.ordersTotal;
      this.topBooksChartLabels = res.topBooksLabels;
      this.topBooksChartData = res.topBooksData;
      this.salesChartData = res.salesChartData;
      this.salesChartLabels = res.salesChartLabels
      console.log('Labels:', this.salesChartData);
      console.log('Data:', this.salesChartLabels);
      setTimeout(() => {
      this.renderTopBooksChart();
      this.renderSalesChart();
    }, 100);
    }, (error) => {
      console.log("Error while getting Data", error)
    })
  }
}
