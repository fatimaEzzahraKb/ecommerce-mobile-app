import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { LogInComponent } from './pages/log-in/log-in.component';
import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { UsersTableComponent } from './pages/Users/users-table/users-table.component';
import { CategoriesComponent } from './pages/Category/categories/categories.component';
import { UserDetailsComponent } from './pages/Users/user-details/user-details.component';
import { CategoryDetailsComponent } from './pages/Category/category-details/category-details.component';
import { CategoryAddComponent } from './pages/Category/category-add/category-add.component';



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
    ReactiveFormsModule,
    UpperCasePipe,
    DatePipe
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LogInComponent,
    CategoriesComponent,
    UserDetailsComponent,
    CategoryDetailsComponent,
    CategoryAddComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
