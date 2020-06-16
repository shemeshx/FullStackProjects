import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }
  globaluser = {}

  IsLoggedIn() {
    return this.http.get(`http://localhost:3000/users/login`, { withCredentials: true })
  }

  loggedOut() {
    document.cookie = 'connect.sid' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  }

  Login(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post('http://localhost:3000/users/login', JSON.stringify(body), { headers: headers, withCredentials: true })
  }

  Register(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post('http://localhost:3000/users/register', JSON.stringify(body), { headers: headers, withCredentials: true, responseType: 'text' })
  }

  IsAdmin(username) {
    return this.http.get(`http://localhost:3000/users/isadmin/${username}`, { withCredentials: true })
  }

  Confrim(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/users/confrim`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }

}
