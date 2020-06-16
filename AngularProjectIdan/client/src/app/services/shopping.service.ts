import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(public us: UsersService, public http: HttpClient) { }

  globalcart

  getAllCategories() {
    return this.http.get(`http://localhost:3000/shopping/categories`, { withCredentials: true })
  }

  createProduct(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/products`, JSON.stringify(body), { headers: headers, withCredentials: true, responseType: 'text' })
  }


  updateProduct(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/products/update`, JSON.stringify(body), { headers: headers, withCredentials: true, responseType: 'text' })
  }


  getAllProducts() {
    return this.http.get(`http://localhost:3000/shopping/products`, { withCredentials: true })
  }

  getProductByCategory(category) {
    return this.http.get(`http://localhost:3000/shopping/products/${category}`, { withCredentials: true })
  }

  createCart(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/cart`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }

  deleteCart(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/cart/delete`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }


  addProductToCart(body) {
    body.cart_id = this.globalcart.id
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/cart/item`, JSON.stringify(body), { headers: headers, withCredentials: true, responseType: 'text' })
  }


  getCartID(body) {
    return this.http.get(`http://localhost:3000/shopping/cart/${body}`, { withCredentials: true })
  }

  getCartItems(cart_ID) {
    return this.http.get(`http://localhost:3000/shopping/cart/items/${cart_ID}`, { withCredentials: true })
  }
  deleteCartItems(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/cart/items/delete`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }
  deleteallCartItems(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/cart/items/delete/all`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }

  countCartItems(cart_ID) {
    return this.http.get(`http://localhost:3000/shopping/cart/count/${cart_ID}`, { withCredentials: true })
  }

  sumCart(cart_ID) {
    return this.http.get(`http://localhost:3000/shopping/cart/sum/${cart_ID}`, { withCredentials: true })
  }

  createOrder(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/order`, JSON.stringify(body), { headers: headers, withCredentials: true, responseType: 'text' })
  }
  getOrder() {
    return this.http.get(`http://localhost:3000/shopping/order/${this.us.globaluser.customer_id}`, { withCredentials: true })
  }
  checkDate(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`http://localhost:3000/shopping/order/check`, JSON.stringify(body), { headers: headers, withCredentials: true })
  }



}
