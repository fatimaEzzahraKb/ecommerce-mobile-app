import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  constructor(private historyService: BookService) { }

  history: any[] = [];
  historyArray: any[] = [];
  pagesAmount: number[] = [];
  pages: number = 0;
  historyPerPage: number = 5;
  currentPage: number = 1;

  ngOnInit(): void {
    this.historyService.getHistory().subscribe({
      next: (res) => {
        console.log("Historique reçu :", res);
        this.historyArray = res.history || [];
        this.pages = Math.ceil(this.historyArray.length / this.historyPerPage);
        this.pagesAmount = Array.from({ length: this.pages }, (_, i) => i + 1);
        this.history = this.historyArray.slice(0, this.historyPerPage);
      },
      error: (err) => {
        console.error("Erreur récupération historique :", err);
      }
    });
  }

  paginate(page: number) {
    const start = (page - 1) * this.historyPerPage;
    const end = page * this.historyPerPage;
    this.history = this.historyArray.slice(start, end);
    this.currentPage = page;
  }

  PrevNext(direction: string) {
    if (direction === 'prev' && this.currentPage > 1) {
      this.paginate(this.currentPage - 1);
    }
    if (direction === 'next' && this.currentPage < this.pages) {
      this.paginate(this.currentPage + 1);
    }
  }
}
