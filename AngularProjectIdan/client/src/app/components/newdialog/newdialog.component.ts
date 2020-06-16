import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newdialog',
  templateUrl: './newdialog.component.html',
  styleUrls: ['./newdialog.component.css']
})
export class NewdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewdialogComponent>, public fb: FormBuilder, public shoppingS: ShoppingService, public router: Router) { }

  public form: FormGroup
  public product_name
  public category_id
  public categories
  public price
  public img

  close(): void {
    this.dialogRef.close();
  }

  getCategories() {
    this.shoppingS.getAllCategories().subscribe(r => {
      this.categories = r
    })
  }

  newProduct() {
    let data = this.form.value
    console.log(data)
    this.shoppingS.createProduct(data).subscribe(r => {
      console.log(r);
      location.reload()
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      product_name: ["", Validators.required],
      category_id: ["", Validators.required],
      price: ["", Validators.required],
      img: ["", Validators.required]
    })
    this.product_name = this.form.controls.product_name
    this.category_id = this.form.controls.category_id
    this.price = this.form.controls.price
    this.img = this.form.controls.img
    this.getCategories()
    console.log(this.categories);
    console.log(this.form.value)
  }

}
