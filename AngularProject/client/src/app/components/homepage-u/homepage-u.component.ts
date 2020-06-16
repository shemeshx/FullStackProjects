import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ResizeEvent } from 'angular-resizable-element';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-homepage-u',
  templateUrl: './homepage-u.component.html',
  styleUrls: ['./homepage-u.component.css'],

})
export class HomepageUComponent implements OnInit {
  public widthSidebar:number
  public widthMain:number
  public widthContainer:number
  public categories:any = [] 
  public selectedProducts:any = [] 
  constructor(public users:UsersService,public itemsS:ItemsService,public cartS:CartService) { }
  ngOnInit() {
    if(!this.users.id){
      this.users.performLogin({token:localStorage.getItem("token")}).subscribe(
        res=>{
          this.users.id=res["id"]
          this.users.isAdmin=res["admin"]
          this.users.email=res["email"]
        }
        ,
        err=>{
          console.log(err);
        }
      )
    }
    this.getAllItems()
    this.getAllCategories()
  }
  
  getAllItems(){
    this.itemsS.getAllItems().subscribe(
      res =>{this.itemsS.items=res;}
      ,
      err =>{console.log(err);}
    )
  }
  getAllCategories(){
    this.itemsS.getAllCategories().subscribe(
      res =>{
        this.categories=res;
       
      }
      ,
      err =>{console.log(err);}
    )
  }
  getProducsByCategory(category){
    this.itemsS.getProductsByCategory(category).subscribe(
      res =>{
        this.selectedProducts=res;
      }
      ,
      err =>{console.log(err);}
    )
  }
  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.widthSidebar = event.rectangle.width
    this.widthMain = this.widthContainer - this.widthSidebar
  }

  search(q){
    this.selectedProducts =[]
    this.itemsS.items.forEach(product => {
      if(product.name.search(q)>=0)
        this.selectedProducts.push({name:product.name,price:product.price,image_url:product.image_url})
    });
  }

  addToCart(prod,amount){
    if(amount!=0){
      let body={item_id:prod.id,amount,cart_id:this.cartS.cart_id}
      this.cartS.addProductToCart(body).subscribe(
        res=>{
          this.cartS.setCartItems();
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
  removeAmount(event){
    if(parseInt(event.target.nextSibling.value)>0)
      event.target.nextSibling.value=parseInt(event.target.nextSibling.value)-1
  }
  addAmount(event){
      event.target.previousSibling.value=parseInt(event.target.previousSibling.value)+1
  }
}
