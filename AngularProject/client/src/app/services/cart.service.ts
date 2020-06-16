import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart:any =[]
  public cart_id:any=""
  constructor(public http:HttpClient,public usersS:UsersService) { }

  setCartItems(){
  this.http.get(`http://localhost:3000/carts/${this.usersS.id}`,{headers:new HttpHeaders({"Content-Type":"application/json"})}).subscribe(
    res=>{
      this.cart = res
    },
    err=>{
      console.log(err)
    }
  )
  }
  setCartID(){
    this.http.get(`http://localhost:3000/carts/getid/${this.usersS.id}`,{headers:new HttpHeaders({"Content-Type":"application/json"})}).subscribe(
      res=>{
        this.cart_id = res["cart_id"]
      },
      err=>{
        console.log(err)
      }
    )
    }
  addProductToCart(body){
    return this.http.post("http://localhost:3000/carts/add",JSON.stringify(body),{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
}
