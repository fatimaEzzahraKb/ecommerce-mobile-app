import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import { observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  modalRef: any;
  editForm: FormGroup = new FormGroup({
    nom: new FormControl("", Validators.required),
    prenom: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  })
  passwordChangeForm: FormGroup = new FormGroup({
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
  },
  {validators:this.passwordMatchValidator}
)
  constructor(private userSrv: UserService, private modalService: NgbModal) { }
  getUserData() {
    const data = localStorage.getItem('user') || '{}';
    this.user = JSON.parse(data);
  }
  ngOnInit() {
    this.getUserData()
    this.editForm.patchValue({
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
    }
    )
    console.log(this.editForm);
  }
  editInfo() {
    console.log(this.editForm.value)
    if (this.editForm.valid) {
      const updatedData = this.editForm.value
      this.userSrv.update(this.user.id, updatedData).subscribe(
        (res: any) => {
          console.log(res)
          if (res.status === 200) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: "Vos données ont été mis-à-jour avec succès",
              timer: 2000,
            })
            localStorage.setItem("user", JSON.stringify(res.body.user));
            this.getUserData()
          }
        },
        (err) => {
          Swal.fire("Error", "Something went wrong", "error");
          console.log(err);
        }
      )
    }
  }
  openModal(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false });
  }
  closeModal() {
    this.modalRef.close();
  }
  passwordMatchValidator(formGroup:FormGroup){
    const password = formGroup.get("password").value;
    const confirmPassword = formGroup.get("confirmPassword").value;

    return password===confirmPassword ? null : {passwordMatch:true}
  }
  changePassWord() {
    console.log(this.passwordChangeForm.value);
    if (this.passwordChangeForm.valid) {
      if (this.passwordChangeForm.get("password").value === this.passwordChangeForm.get("confirmPassword").value) {
        
        this.userSrv.changePassword(this.user.id, this.passwordChangeForm.value).subscribe(
          (res: any) => {
            if (res.status === 200) {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: "Vos données ont été mis-à-jour avec succès",
                timer: 2000,
              })
              this.closeModal()
              this.passwordChangeForm.patchValue({
                password: "",
                confirmPassword: ""
              }
              )
              console.log(res.body);
            }
          }, (error: any) => {
            console.log(error);
          }
        )
      
      }
      else{

      }
    }
  }
}
