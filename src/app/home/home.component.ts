import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
login = false
  constructor(private router:Router,
              private services:AuthService,
              private dialog: MatDialog,
              private service:AuthService){}

  ngOnInit(): void {
    if(localStorage.getItem('token')!= null){
      this.login =true
      this.services.checkToken().subscribe((res:any)=>{
        this.router.navigate(['/userdashboard'])
      },(error:any)=>{
        console.log(error)
      })
    }
  }

  logout(): void {
    this.service.logout();
  } 

 
}
