import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UsersTableComponent } from 'src/app/pages/Users/users-table/users-table.component';
import { CategoriesComponent } from 'src/app/pages/Category/categories/categories.component';
import { UserDetailsComponent } from 'src/app/pages/Users/user-details/user-details.component';
import { CategoryAddComponent } from 'src/app/pages/Category/category-add/category-add.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'users',          component: UsersTableComponent },
    { path: 'users/:id',          component: UserDetailsComponent },
    { path: 'categories',     component: CategoriesComponent },
    { path: 'categories/add',     component: CategoryAddComponent }
];
