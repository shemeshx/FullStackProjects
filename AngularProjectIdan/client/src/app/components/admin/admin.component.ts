import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewdialogComponent } from '../newdialog/newdialog.component';
import { UpdatedialogComponent } from '../updatedialog/updatedialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public shoppingS: ShoppingService, public dialog: MatDialog, public UserS: UsersService, public router: Router) { }
  public categories
  public products
  public chprod
  public user

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

  logout() {
    localStorage.removeItem('cart')
    localStorage.removeItem('user')
    this.UserS.loggedOut()
    this.router.navigateByUrl('/login')
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewdialogComponent, {
      width: '1000px',
    })
  }


  openDi(product) {
    console.log(product);
    let dialogRef = this.dialog.open(UpdatedialogComponent, {
      data: {
        id: product.id,
        category_id: product.category_id,
        product_name: product.product_name,
        price: product.price,
        img: product.img
      },

    })
  }


  ngOnInit() {
    this.user = this.UserS.globaluser
    if (this.user === undefined) {
      this.UserS.globaluser = JSON.parse(localStorage.getItem('user'))
      this.user = this.UserS.globaluser
    }
    this.getCategories()
    this.getProducts()
  }

}
