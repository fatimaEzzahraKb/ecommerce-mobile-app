  import { Component, OnInit , inject } from '@angular/core';
  import { ActivatedRoute, Router, RouterLink } from '@angular/router';
  import { UserService } from 'src/app/services/user.service';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
  })
  export class UserDetailsComponent implements OnInit {

    userInfo : any = {};
    router = inject(Router);
    constructor(private route:ActivatedRoute,private userSrv:UserService) { 

    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.showUser(parseInt(id));
    }
    showUser(id:number){
      this.userSrv.show(id).subscribe((res:any)=>{
        this.userInfo = res.user;
      },(err)=>{
        console.log(err);
      })
    }
    deleteUser() {
        Swal.fire({
          title:"Are you Sure?",
          text:"You won't be able to revert the user!",
          icon:"warning",
          showCancelButton:true,
          confirmButtonText:"Yes, delete it!",
          confirmButtonColor:"red"
        }).then((result)=>{
          if(result.isConfirmed){
          this.userSrv.delete(this.userInfo.id).subscribe(
            (res: any) => {
              
              console.log(res.status);
              this.router.navigateByUrl("/users");
              
            },
            (err)=>{
              Swal.fire('Error',"Failed to Delete the user","error")
              console.log("Error:",err)
            }
          );}
        })
        
      }
  }
