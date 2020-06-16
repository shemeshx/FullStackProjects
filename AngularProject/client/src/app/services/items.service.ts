import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public items:any = [] 
 
  constructor(public http:HttpClient) { }
  getAllItems(){
    return this.http.get("http://localhost:3000/item/all",{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
  getAllCategories(){
    return this.http.get("http://localhost:3000/item/categories",{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
  getProductsByCategory(category){
    return this.http.get(`http://localhost:3000/item/${category}`,{headers:new HttpHeaders({"Content-Type":"application/json"})})
  }
}
