import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/categories', title: 'Categories',  icon:'ni-bullet-list-67 text-pink', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/products', title: 'Livres', icon:'ni-box-2 text-green', class:''},
    { path: '/orders', title: 'Commandes', icon:'ni-delivery-fast text-orange', class:''},
    { path: '/users', title: 'Users',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/sales_history', title: 'Historique de ventes',  icon:'ni-archive-2', class: '' },
    { path: '/user-profile', title: 'My profile',  icon:'ni-circle-08 text-pink', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public user : any ;
  public username : String = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
      this.user = JSON.parse(localStorage.getItem("user"));
    this.username = this.user.prenom +" "+ this.user.nom;
  }
    logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("login");
    
  }
}
