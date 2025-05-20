import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() {}

  logIn(){
    console.log("hiii ")
    
  }
  ngOnInit() {
    this.logIn();
  }
  ngOnDestroy() {
  }
}
