import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/user'; // Your Node.js server URL

  constructor(private http: HttpClient) {}

  uploadImage(id:any,file: File): Observable<any> {
    console.log(id)
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.apiUrl}/upload?id=${id}`, formData);
  }
}
