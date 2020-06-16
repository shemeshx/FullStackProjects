import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'ordertabel',
  templateUrl: './ordertabel.component.html',
  styleUrls: ['./ordertabel.component.css']
})
export class OrdertabelComponent implements OnInit {

  public Items
  public cart
  public totalprice
  public totalProd

  constructor(public shoppingS: ShoppingService, public userS: UsersService, public router: Router) { }
  getItems() {
    this.Items = JSON.parse(localStorage.getItem('Items'))
    this.totalProd = JSON.parse(localStorage.getItem('totalProd'))
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
  }

  createPdf() {
    let data = document.getElementById('tblCustomers');
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); 
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('reception.pdf'); 
    });
  }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'))
    this.us.globaluser = JSON.parse(localStorage.getItem('user'))
    console.log(this.us.globaluser);
    console.log(this.cart);
    this.getItems()
    if (this.cart === undefined) {
      localStorage.removeItem('cart')
      localStorage.removeItem('user')
      this.us.loggedOut()
      this.router.navigateByUrl('/login')
    }
  }

}
