import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule, MatFormFieldModule,MatIconModule, MatInputModule, MatButtonModule} from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { HomepageAComponent } from './components/homepage-a/homepage-a.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomepageUComponent } from './components/homepage-u/homepage-u.component';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { ResizableModule } from 'angular-resizable-element';
import {MatCardModule} from '@angular/material/card';
import { CartComponent } from './components/cart/cart.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageAComponent,
    OrdersComponent,
    HomepageUComponent,
    CartComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    NgMatSearchBarModule,
    ResizableModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
