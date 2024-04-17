import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http:HttpClient,
    private router:Router,
    private snackBar: MatSnackBar) { }
apiUrl='http://localhost:8080/admin'

getUser(){
  console.log("admin")
  return this.http.get(this.apiUrl+'/dashboard')
}
updateUser(id: any, data: any) {
  const url = `${this.apiUrl}/save?id=${id}`;

  console.log('Request URL:', url);
  console.log('Request Data:', data);

  return this.http.post(url, data);
}
userDelete(id:any){
  console.log(id)
  return this.http.get(`${this.apiUrl}/delete?id=${id}`);
}

userSerach(value:any){
 
  const body = { value: value };
  return this.http.post(`${this.apiUrl}/search`,body)
}
}
