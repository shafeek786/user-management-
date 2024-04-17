import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuards implements CanActivate {
  currentUrl!:string
  constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.currentUrl = this.router.url
    if (this.service.isLogin()) {
     
          if (this.service.gerUserrole() == 'user') {
            return true;
          } else {
              this.tostr.warning('You dont have accesss.')
             return this.router.navigate(['user'])
          }
       
    }
    return this.router.parseUrl('/login');
  }

}