import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';      // IMPORTANT
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { ProductsComponent } from './pages/products/product-component/products.component';

import { LogInComponent } from './pages/log-in/log-in.component';
import { DatePipe } from '@angular/common';
import { UsersTableComponent } from './pages/Users/users-table/users-table.component';
import { CategoriesComponent } from './pages/Category/categories/categories.component';
import { UserDetailsComponent } from './pages/Users/user-details/user-details.component';
import { CategoryAddComponent } from './pages/Category/category-add/category-add.component';
import { CategorieDetailsComponent } from './pages/Category/categorie-details/categorie-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommandesComponent } from './pages/Order/commandes/commandes.component';
import { CartItemsComponent } from './pages/cart-items/cart-items.component';
import { OrderDetailsComponent } from './pages/Order/order-details/order-details.component';
import { SalesHistoryComponent } from './pages/sales-history/sales-history.component';

@NgModule({
  imports: [
    BrowserModule,            // Ajouté ici
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ProductsComponent,
    UsersTableComponent,
    LogInComponent,
    CategoriesComponent,
    UserDetailsComponent,
    CategoryAddComponent,
    CategorieDetailsComponent,
  
    CommandesComponent,
  OrderDetailsComponent,
    CartItemsComponent,
    SalesHistoryComponent,
  ],
  providers: [
    DatePipe                 // Ici dans providers, si tu en as besoin en TS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
