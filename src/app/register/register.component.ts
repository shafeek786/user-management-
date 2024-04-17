import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private services: AuthService,
    private router: Router
  ) {}

  token = localStorage.getItem('token')
    role = localStorage.getItem('role')
  registerForm = this.builder.group({
    
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email,Validators.pattern(GlobalConstants.emailRegex)])),
    mobile: this.builder.control('', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),
    password: this.builder.control('', Validators.required)

  });

  proceedRegistration() { // Corrected method name
    if (this.registerForm.valid) {
      console.log(this.registerForm)
      this.services.proceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success("Success");
        if(this.role=== 'admin'){
          console.log("adimn reg")
          this.router.navigate(['user']);

        }else{
          this.router.navigate(['login']);

        }
      });
    } else {
      this.toastr.warning("Please enter valid data");
    }
  }
}
