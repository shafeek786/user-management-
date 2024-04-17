import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SnackbarService } from './snackbar.service';

import { Observable } from 'rxjs';
import { GlobalConstants } from '../shared/global-constants';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarservice: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoleArray:string[] = route.data['expectedRole'];

    const token: any = localStorage.getItem('token');
    let tokenPayLoad: any;
  

    try {
      tokenPayLoad = jwtDecode(token)
      

  
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.clear()
      this.router.navigate([''])
     
    }

    let checkRole = false

    for(let i=0;i<expectedRoleArray.length;i++){
        if(expectedRoleArray[i]==tokenPayLoad.role){
          checkRole = true
        }
    }
    if(tokenPayLoad.role == 'user' || tokenPayLoad.role == 'admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true
      }
      this.snackbarservice.openSnackBar(GlobalConstants.unauthroized,GlobalConstants.error)
      this.router.navigate(['/userdashboard'])
      return false
    }
    else{
      this.router.navigate(['/'])
      localStorage.clear()
      return false
    }
 
  }
}
