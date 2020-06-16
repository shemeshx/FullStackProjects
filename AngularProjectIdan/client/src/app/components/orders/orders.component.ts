import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrdersComponent>, public shoppingS: ShoppingService, public userS: UsersService, public fb: FormBuilder, public router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }
  public form: FormGroup
  public Items
  public cart
  public totalprice
  public totalProd
  public creditCard
  public city
  public shippingDate
  public street
  public al: boolean = false
  public tab = 1
  public submit = false
  public cities = [
    { id: 1, name: "Modi'in" }, { id: 2, name: "Tel Aviv" }, { id: 3, name: "Jerusalem" }, { id: 4, name: "Haifa" }, { id: 5, name: "Beer-sheva" }, { id: 6, name: "Rishon Lezion" }, { id: 7, name: "Hoolon" }, { id: 8, name: "Shoham" }, { id: 9, name: "Ramat Gan" }, { id: 10, name: "Givatayim" }]

  closehome() {
    this.dialogRef.close();
    localStorage.removeItem('cart')
    localStorage.removeItem('user')
    localStorage.removeItem('Items')
    localStorage.removeItem('totalprice')
    localStorage.removeItem('totalProd')
    this.userS.loggedOut()
    this.router.navigateByUrl('/login')
  }
  close() {
    this.dialogRef.close();
  }

  getItems() {
    this.cart = this.shoppingS.globalcart
    if (!this.userS.globaluser) {
      this.router.navigateByUrl('/login')
    }
    this.shoppingS.getCartItems(this.shoppingS.globalcart.id).subscribe(r => {
      this.Items = r
      this.shoppingS.countCartItems(this.shoppingS.globalcart.id).subscribe(c => {
        console.log(c);
        this.totalProd = c.count
        console.log(this.totalProd);
      })
      this.shoppingS.sumCart(this.shoppingS.globalcart.id).subscribe(s => {
        console.log(s);
        this.totalPrice = s.final_price
      })
    }, err => console.log(err))

  }
  removecart() {
    this.shoppingS.deleteallCartItems({
      cart_id: this.shoppingS.globalcart.id
    }).subscribe(r => {
      console.log(r)
    })
    this.shoppingS.deleteCart({ customer_id: this.userS.globaluser.customer_id }).subscribe(c => {
      console.log(c);
    })
  }


  createOrder() {
    let num = this.form.value.creditCard
    let credit_last_num = num.slice(num.length - 4)
    let order_date = moment(this.form.value.shippingDate).format("YYYY-MM-DD")
    this.shoppingS.checkDate({ order_date }).subscribe(r => {
      if (r === null || r.lenght < 3) {
        let orderObj = {
          credit_last_num: credit_last_num,
          order_date: order_date,
          cart_id: this.cart.id,
          city: this.city.value,
          street: this.street.value,
          customer_id: this.cart.customer_id,
          final_price: this.totalPrice
        }
        this.shoppingS.createOrder(orderObj).subscribe(i => {
          console.log(i);
        })
        this.removecart()
      }
      else {
        console.log(r.msg)
      }
    }, err => console.log(err))
  }

  ngOnInit() {
    this.form = this.fb.group({
      shippingDate: ["", Validators.required],
      creditCard: ["", [Validators.required, Validators.min(12), Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]],
      city: ["", Validators.required],
      street: ["", [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]]
    })
    this.shippingDate = this.form.controls.shippingDate
    this.creditCard = this.form.controls.creditCard
    this.city = this.form.controls.city
    this.street = this.form.controls.street
    this.getItems()
  }

}
