import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MAT_DIALOG_DATA
import { AdminAuthService } from '../service/admin-auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private services: AdminAuthService,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userDetails: any } // Inject MAT_DIALOG_DATA
  ) {}

  ngOnInit(): void {
    // Access data.userDetails here if needed
    this.rolelist = this.data.userDetails.role;
    // Initialize your form controls with the received data
    this.registerForm.patchValue({
      name: this.data.userDetails.name,
      email: this.data.userDetails.email,
      mobile: this.data.userDetails.mobile
    });
  }

  rolelist: any;
  registerForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    mobile: this.builder.control('', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]))
  });

  updateUser() {
    
const updatedUserData = {
  name: this.registerForm.value.name,
  email: this.registerForm.value.email,
  mobile:this.registerForm.value.mobile
};

const userId = this.data.userDetails._id


  this.services.updateUser(userId,updatedUserData).subscribe(res=>{
    this.toastr.success("Updated")
    this.dialogRef.close()
  })

  }
}
