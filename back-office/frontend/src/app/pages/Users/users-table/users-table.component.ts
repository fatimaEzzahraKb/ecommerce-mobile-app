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
  
  usersTablePage: any[] = [];
  pagesAmount:number[]=[];
  pages:number = 0;
  usersPerPage:number =5;
  currentPage:number = 1;
  constructor(private userSrv: UserService) {
  }
  getUsers() {
    this.userSrv.loadUsers().subscribe((res: any) => {
      this.usersArray = res.users;
      this.pages =Math.floor(this.usersArray.length / this.usersPerPage)+1;
      this.pagesAmount = Array.from({length:this.pages},(_,i)=>i+1);
      this.usersTablePage = this.usersArray.slice(0,5);
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
  paginate(page:number){
    const start = (page-1)*this.usersPerPage;
    const end =page * this.usersPerPage;
    this.usersTablePage = this.usersArray.slice(start,end);
    this.currentPage = page;
  }
  PrevNext(path:string){
    this.currentPage= path==="prev" ? this.currentPage-1 : this.currentPage+1;
    const start = (this.currentPage-1)*this.usersPerPage;
    const end =this.currentPage * this.usersPerPage;
    this.usersTablePage = this.usersArray.slice(start,end);
  }
}
