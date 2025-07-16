import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProductsComponent } from 'src/app/pages/products/product-component/products.component';
import { UsersTableComponent } from 'src/app/pages/Users/users-table/users-table.component';
import { CategoriesComponent } from 'src/app/pages/Category/categories/categories.component';
import { UserDetailsComponent } from 'src/app/pages/Users/user-details/user-details.component';
import { CategoryAddComponent } from 'src/app/pages/Category/category-add/category-add.component';
import { CategorieDetailsComponent } from 'src/app/pages/Category/categorie-details/categorie-details.component';
import { CommandesComponent } from 'src/app/pages/Order/commandes/commandes.component';
import { OrderDetailsComponent } from 'src/app/pages/Order/order-details/order-details.component';
import { CartItemsComponent } from 'src/app/pages/cart-items/cart-items.component';
import { SalesHistoryComponent } from 'src/app/pages/sales-history/sales-history.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'users', component: UsersTableComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CategorieDetailsComponent },
    { path: 'orders', component: CommandesComponent },
    { path: 'orders/:id', component: OrderDetailsComponent },
    { path: 'cartItems', component: CartItemsComponent },
    { path: 'sales_history', component: SalesHistoryComponent},
];
