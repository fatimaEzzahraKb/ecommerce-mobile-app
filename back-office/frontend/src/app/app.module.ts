import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { ProductsComponent } from './pages/products/products.component';
import { CartItemsComponent } from './pages/cart-items/cart-items.component';

import { LogInComponent } from './pages/log-in/log-in.component';
import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { UsersTableComponent } from './pages/Users/users-table/users-table.component';
import { CategoriesComponent } from './pages/Category/categories/categories.component';
import { UserDetailsComponent } from './pages/Users/user-details/user-details.component';
import { CategoryAddComponent } from './pages/Category/category-add/category-add.component';
import { CategorieDetailsComponent } from './pages/Category/categorie-details/categorie-details.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgFor,
    RouterModule,
    UpperCasePipe,
    DatePipe,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LogInComponent,
    CategoriesComponent,
    UserDetailsComponent,
    CategoryAddComponent,
    CategorieDetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
