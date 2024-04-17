import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private services: AuthService,
    private router: Router
  ) {}

  data:any
  loginForm = this.builder.group({
    
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)

  });

  proceedLogin() { // Corrected method name
    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.services.proceedLogin(this.loginForm.value).subscribe((res:any) => {
        this.data = res

        if(this.data.message === "success"){
          localStorage.setItem('token',res.token)
            const userData:{
              role
              :string
            } = jwtDecode(res.token)
           console.log(userData.role)
            localStorage.setItem('role',userData.role)
          this.toastr.success("Success");
          if(localStorage.getItem('role')==="admin"){
            this.router.navigate(['user']);
          }else{
            this.router.navigate(['userdashboard']);
          }
       
        }else {
          this.toastr.error(this.data.message)
        }
        
      });
    } else {
      this.toastr.warning("Please enter valid data");
    }
  }

}
