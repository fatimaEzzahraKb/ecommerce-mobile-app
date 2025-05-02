import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  usersArray:any[] = [];
  constructor(private userSrv:UserService) {
   }
    getUsers(){
    this.userSrv.loadUsers().subscribe((res:any)=>{
      this.usersArray = res.users;
    })
    console.log(this.usersArray);
   }
  ngOnInit(): void {
    this.getUsers();
  }

}
