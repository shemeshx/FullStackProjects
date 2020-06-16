import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [
    `
      mwlResizable {
        box-sizing: border-box;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor(public shoppingS: ShoppingService, public userS: UsersService, public router: Router) { }

  public width: number
  public categories
  public products
  public amount = 0
  public chprod

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.width = event.rectangle.width
  }
  getCategories() {
    this.shoppingS.getAllCategories().subscribe(r => {
      this.categories = r
    })
  }

  getProducts() {
    this.shoppingS.getAllProducts().subscribe(r => {
      this.products = r
    })

  }

  productByCategory(category) {
    console.log(category);
    this.shoppingS.getProductByCategory(category).subscribe(r => {
      this.products = r
    })
  }

  add(product) {
    this.chprod = product.id
    this.amount++
  }
  async reload(url: string): Promise<boolean> {
    console.log(url);
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  delete() {
    if (this.amount > 0) {
      this.amount--
    }
  }
  submit(product) {
    let prod = { product_id: product.id, count: this.amount }
    this.shoppingS.addProductToCart(prod).subscribe(r => {
      console.log('add prod to cart');
    }, err => console.log(err))
    this.amount = 0
    this.reload('/home')
  }
  logout() {
    localStorage.removeItem('cart')
    localStorage.removeItem('user')
    this.userS.loggedOut()
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.getCategories()
    this.getProducts()
  }
}
