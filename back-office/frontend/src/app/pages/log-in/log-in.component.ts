import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  apiUrl:string = "http://localhost:3000/users/login";

  http = inject(HttpClient);
  router = inject(Router);

  loginForm:FormGroup =new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    mdp: new FormControl("",[Validators.required]),
    rememberMe: new FormControl(false)
  });
  error:string = "";
  constructor() { }

  ngOnInit(): void {

  }
  logIn(){
    this.http.post(this.apiUrl,this.loginForm.value).subscribe((res:any)=>{
      if(res.status==500){
        alert(res.message);
        console.log(res.error);

      }
      else if(res.status==400){
        this.error = res.message;
      }
      else{
        if(res.user.isAdmin){
        localStorage.setItem("token",res.token);
        localStorage.setItem("user",JSON.stringify(res.user));
          
        this.router.navigateByUrl('dashboard')
      }}
    })
  }
}
