import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import * as moment from 'moment';
import { json } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  public username
  public password
  public user
  public cart
  public new
  public haveCart
  public haveOrder
  public CreateDate
  public totalProd
  public totalPrice
  public order
  public orderDate

  constructor(public userS: UsersService, public fb: FormBuilder, public router: Router, public msb: MatSnackBar, public shoppingS: ShoppingService) { }
  signin() {
    this.userS.Login({
      username: this.username.value,
      password: this.password.value
    }).subscribe(r => {
      console.log(r)
      this.userS.globaluser.username = r.username
      this.userS.globaluser.customer_id = r.customer_id
      this.userS.globaluser.f_name = r.f_name
      this.userS.globaluser.street = r.street
      this.userS.globaluser.city = r.city
      this.userS.globaluser.role = r.role
      console.log(this.userS.globaluser);

      this.userS.IsAdmin(r.username).subscribe(r => {
        console.log(r)
        if (r) {
          this.userS.globaluser.isadmin = true
          localStorage.setItem('user', JSON.stringify(this.userS.globaluser))
          this.router.navigateByUrl('/admin')

        } else {
          this.userS.globaluser.isadmin = false
          localStorage.setItem('user', JSON.stringify(this.userS.globaluser))
          this.shoppingS.getOrder().subscribe(o => {
            console.log(o);
            this.order = o
            this.orderDate = moment(this.order.order_date).format("DD-MM-YYYY")

          })

          if (this.order) {
            this.haveCart = 2
          } else {
            this.shoppingS.getCartID(this.userS.globaluser.customer_id).subscribe(i => {
              console.log(i);
              if (i) {
                this.haveCart = 1
                this.shoppingS.globalcart = i
                this.cart = this.shoppingS.globalcart
                localStorage.setItem('cart', JSON.stringify(this.cart))
                this.CreateDate = moment(this.cart.date_created).format("DD-MM-YYYY")
                this.shoppingS.countCartItems(this.cart.id).subscribe(c => {
                  console.log(c);
                  this.totalProd = c.count
                  console.log(this.totalProd);
                })
                this.shoppingS.sumCart(this.cart.id).subscribe(s => {
                  console.log(s);
                  this.totalPrice = s.final_price
                })
              }
              else {
                this.haveCart = 3
              }
            }, err => this.haveCart = 3)
          }
        }

      })
    }, err => {
      console.log(err)
      this.form.reset()
      this.msb.open(err.error, 'X', {
        duration: 2000,
      })
    })
  }
  createCart() {
    console.log(this.userS.globaluser.customer_id);
    this.shoppingS.createCart({ customer_id: this.userS.globaluser.customer_id }).subscribe(r => {
      console.log(r);
      this.shoppingS.getCartID(this.userS.globaluser.customer_id).subscribe(i => {
        console.log(i)
        this.shoppingS.globalcart = i
        this.cart = this.shoppingS.globalcart
        localStorage.setItem('cart', JSON.stringify(this.cart))
      })
    })
  }


  ngOnInit() {
    this.userS.IsLoggedIn().subscribe(r => {
      this.userS.globaluser.username = r.username
      this.userS.globaluser.customer_id = r.id
      this.userS.globaluser.f_name = r.f_name
      this.userS.globaluser.role = r.role
      this.userS.globaluser.street = r.street
      this.userS.globaluser.city = r.city
      if (r) {
        if (this.userS.globaluser.role == "admin") {
          this.router.navigateByUrl('/admin')

        } else {
          this.shoppingS.getCartID(this.userS.globaluser.customer_id).subscribe(i => {
            console.log(i);
            this.shoppingS.globalcart = i
            this.haveCart = 1
            this.cart = this.shoppingS.globalcart
            this.CreateDate = moment(this.cart.date_created).format("DD-MM-YYYY")
            this.shoppingS.countCartItems(this.cart.id).subscribe(c => {
              console.log(c);
              this.totalProd = c.count
              console.log(this.totalProd);
            })
            this.shoppingS.sumCart(this.cart.id).subscribe(s => {
              console.log(s);
              this.totalPrice = s.final_price
            })

          })
        }
      }
    })

    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })

    this.username = this.form.controls.username
    this.password = this.form.controls.password
  }
}
