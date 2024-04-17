// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUrl!:string
  constructor(private authService: AuthService, private router: Router) {
    this.currentUrl = this.router.url
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      // User is authenticated, redirect to home or another route
      this.router.navigate([this.currentUrl])
      return false; // Prevent access to the route
    } else {
      console.log("hiii")
      return true; // Allow access to the route for non-authenticated users
    }
  }
}

