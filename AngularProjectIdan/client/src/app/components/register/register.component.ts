import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { RxwebValidators } from "@rxweb/reactive-form-validators"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public panelA: FormGroup
  public panelB: FormGroup
  public username
  public password
  public conpassword
  public f_name
  public l_name
  public id
  public city
  public street
  public al: boolean = false
  public tab: boolean = true
  public cities = [
    { id: 1, name: "Modi'in" }, { id: 2, name: "Tel Aviv" }, { id: 3, name: "Jerusalem" }, { id: 4, name: "Haifa" }, { id: 5, name: "Beer-sheva" }, { id: 6, name: "Rishon Lezion" }, { id: 7, name: "Hoolon" }, { id: 8, name: "Shoham" }, { id: 9, name: "Ramat Gan" }, { id: 10, name: "Givatayim" }]

  public idValidator = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  constructor(public shoppingS: ShoppingService, public userS: UsersService, public fb: FormBuilder, public router: Router, public msb: MatSnackBar) { }

  register() {
    if (this.username.value && this.password.value && this.f_name.value && this.l_name.value && this.id.value && this.city.value && this.street.value) {
      this.userS.Register({
        username: this.username.value,
        password: this.password.value,
        f_name: this.f_name.value,
        l_name: this.l_name.value,
        id: this.id.value,
        city: this.city.value,
        street: this.street.value
      }).subscribe(r => {
        console.log(r);
        this.router.navigateByUrl('/login')
      })
    }

  }
  check() {
    if (this.username.value && this.password.value && this.id.value && this.conpassword.value) {
      this.userS.Confrim({ username: this.username.value, id: this.id.value }).subscribe(r => {
        if (r)
          console.log(r)
        const { username, id } = r
        if (username) {
          alert(username)
        } else if (id) {
          alert(id)
        } else {
          this.al = true
        }
      }, err => { this.al = true })
    }
    else {
      alert('Please fill all the information.')
    }
  }

  ngOnInit() {
    this.panelA = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      conpassword: ["", [Validators.required, Validators.minLength(4), RxwebValidators.compare({ fieldName: 'password' })]],
      id: ["", [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
    })

    this.panelB = this.fb.group({
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]]
    })
    this.username = this.panelA.controls.username
    this.password = this.panelA.controls.password
    this.conpassword = this.panelA.controls.conpassword
    this.f_name = this.panelB.controls.f_name
    this.l_name = this.panelB.controls.l_name
    this.id = this.panelA.controls.id
    this.city = this.panelB.controls.city
    this.street = this.panelB.controls.street
  }

}
