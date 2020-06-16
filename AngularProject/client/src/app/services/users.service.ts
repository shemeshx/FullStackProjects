import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public isAdmin:boolean =false
  public email:string
  public id:string
  constructor(public http:HttpClient) { }
  performLogin(body){
    return this.http.post("http://localhost:3000/users/login",JSON.stringify(body),{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
  //TODO:register
  performRegister(body){
    return this.http.post("http://localhost:3000/users/register",JSON.stringify(body),{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
}
