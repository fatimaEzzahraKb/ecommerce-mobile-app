import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  usersArray: any[] = [];
  constructor(private userSrv: UserService) {
  }
  getUsers() {
    this.userSrv.loadUsers().subscribe((res: any) => {
      this.usersArray = res.users;
      console.log(this.usersArray);
    })
  }
  deleteUser(id: number) {
    Swal.fire({
      title:"Are you Sure?",
      text:"You won't be able to revert the user!",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Yes, delete it!"
    }).then((result)=>{
      if(result.isConfirmed){
      this.userSrv.delete(id).subscribe(
        (res: any) => {
          this.getUsers();
        },
        (err)=>{
          Swal.fire('Error',"Failed to Delete the user","error")
          console.log("Error:",err)
        }
      );}
    })
    
  }
  ngOnInit(): void {
    this.getUsers();
  }
  paginate(){

  }
}
