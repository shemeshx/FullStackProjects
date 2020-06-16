import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatedialog',
  templateUrl: './updatedialog.component.html',
  styleUrls: ['./updatedialog.component.css']
})
export class UpdatedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatedialogComponent>, public fb: FormBuilder, public shoppingS: ShoppingService, @Inject(MAT_DIALOG_DATA) public data: any, public router: Router) { }
  public form: FormGroup
  public product_name
  public category_id
  public categories
  public price
  public img

  getCategories() {
    this.shoppingS.getAllCategories().subscribe(r => {
      this.categories = r
    })

  }

  updateproduct(update: NgForm) {
    console.log(update.form.controls["price"].value);
    let formValue = { "id": this.data.id, "product_name": update.form.controls["product_name"].value, "price": update.form.controls["price"].value, "img": update.form.controls["img"].value, "category_id": update.form.controls["category_id"].value }
    this.shoppingS.updateProduct(formValue).subscribe(r => {
      this.dialogRef.close();
      location.reload()
    })
  }

  close() {
    this.dialogRef.close();
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
  }
}
