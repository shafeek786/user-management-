import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
decodedToken:any
  constructor(private http:HttpClient,
              private router:Router,
              private snackBar: MatSnackBar) { }
  apiUrl='http://localhost:8080/user'
  GetAll(){
    return this.http.get(this.apiUrl)
  }
  GetByCode(code:any){
    return this.http.get(this.apiUrl+'/'+code)
  }

  proceedRegister(inputData:any){
  
    return this.http.post(this.apiUrl+'/signup' ,inputData)

  }

  Update(code:any,inputData:any){
    return this.http.put(this.apiUrl+'/'+code,inputData)
  }

  proceedLogin(inputData:any){
    return this.http.post(this.apiUrl+'/login',inputData)
  }

  checkToken(){
    return this.http.get(this.apiUrl+'/checkToken')
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if(!token){
     
      this.router.navigate(['/'])
      return false
    }
    else{
      return true
    }
  }

  logout(): void {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Optionally, perform any additional cleanup or user-related tasks

    // Navigate to the login page or any other desired page
    this.router.navigate(['/login']);

    // Optionally, display a logout success message
    this.snackBar.open('Logout successful', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  isLogin(){
    return localStorage.getItem('token')!=null
  }

  gerUserrole(){
    return localStorage.getItem('role')!=null?localStorage.getItem('role')?.toString():''
  }

  getUserDetails(){
    const  tokens:any= localStorage.getItem('token');

    this.decodedToken = jwtDecode(tokens)
    const id = this.decodedToken.id
    return this.http.get(`${this.apiUrl}/userDetails?id=${id}`)
  }
  
}
