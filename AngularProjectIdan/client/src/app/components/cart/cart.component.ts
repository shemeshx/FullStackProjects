import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdersComponent } from '../orders/orders.component';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public userS: UsersService, public router: Router, public shoppingS: ShoppingService, public dialog: MatDialog) { }
  public Items
  public cart
  public totalprice
  public totalProd
  public totalPrice


  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  getItems() {
    this.shoppingS.getCartItems(this.shoppingS.globalcart.id).subscribe(r => {
      this.Items = r
      console.log(r)
      localStorage.setItem('Items', JSON.stringify(this.Items))
      this.shoppingS.countCartItems(this.shoppingS.globalcart.id).subscribe(c => {
        console.log(c);
        this.totalProd = c.count
        localStorage.setItem('totalProd', JSON.stringify(this.totalProd))
      })
      this.shoppingS.sumCart(this.shoppingS.globalcart.id).subscribe(s => {
        console.log(s);
        this.totalPrice = s.final_price
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
      })
    }, err => console.log(err))

  }

  openDi() {
    let dialogRef = this.dialog.open(OrdersComponent, {
      data: {
        street: this.userS.globaluser.street,
        city: this.userS.globaluser.city
      }
    })
  }

  del(item) {
    console.log(item);
    console.log(this.cart);
    this.shoppingS.deleteCartItems({
      product_id: item.id,
      cart_id: this.cart.id
    }).subscribe(r => {
      console.log(r)
      if (r) {
        this.reload('/home')
      }
    }
    )
  }
  deleteall() {
    console.log();
    console.log(this.cart);
    this.shoppingS.deleteallCartItems({
      cart_id: this.cart.id
    }).subscribe(r => {
      console.log(r)
      if (r) {
        this.reload('/home')
      }
    }
    )
  }


  ngOnInit() {
    if (this.cart === undefined) {
      this.cart = JSON.parse(localStorage.getItem('cart'))
      this.userS.globaluser = JSON.parse(localStorage.getItem('user'))
      console.log(this.userS.globaluser);
      console.log(this.cart);
      this.shoppingS.globalcart = this.cart
      if (this.cart === undefined) {
        localStorage.removeItem('cart')
        localStorage.removeItem('user')
        this.userS.loggedOut()
        this.router.navigateByUrl('/login')
      }
    }
    this.getItems()
  }
}
