
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  

  userId?:string | null


  private apiKey: string = 'http://localhost:3000'

  constructor(private http: HttpClient ,private router:Router) { 
  }

  signUp(data: object): Observable<any> {
    return this.http.post<any>(`${this.apiKey}/createUser`, data)
  }

  logIn(data: object): Observable<any> {
    return this.http.post<any>(`${this.apiKey}/userLogin`, data)
  }

  getUserImage(){
    return this.http.get(`${this.apiKey}/user-profile/${this.userId}`)
  }

  updateImage(file: object): Observable<any> {
    let params: HttpParams | undefined;
    if (this.userId) {
      params = new HttpParams().set('userId', this.userId);
    }

    
    return this.http.post(`${this.apiKey}/update-Profile-Picture`, file, { params });
  }








  // admin



  getAllUser(){
    return this.http.get(`${this.apiKey}/userData`)
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiKey}/deleteUser/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiKey}/editUser/${userId}`;
    return this.http.post(url, userData);
  }

  
  uploadImage(file: object):Observable<{url:string}>{
    return this.http.post<{url:string}>(`${this.apiKey}/image-upload`, file);

  }



















  getTokendata(data:any){
    console.log(data.userId);
    this.userId = data.userId
    return this.userId
  }



  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        return !!token
      } else {
        return false
      }
    } else {
      return false
    }
  }




  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false; 

    const decodedToken: any = jwtDecode(token);
    //console.log(JSON.stringify(decodedToken));
    
    return decodedToken.isAdmin === true; 
  }



  

  logout():void{
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}




