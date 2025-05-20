import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userStr = localStorage.getItem("user");

    if(userStr){
      console.log(userStr);
      const user = JSON.parse(userStr);
      if(user.isAdmin){
        return true;
      }
    }
    return this.router.parseUrl("/login");
  }

}
