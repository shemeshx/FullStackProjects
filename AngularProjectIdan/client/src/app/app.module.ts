import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule  } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import {MatTabsModule} from '@angular/material/tabs';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ResizableModule } from 'angular-resizable-element';
import { SearchPipe } from './services/search.pipe';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { NewdialogComponent } from './components/newdialog/newdialog.component';
import { UpdatedialogComponent } from './components/updatedialog/updatedialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { HighlightPipe } from './services/highlight.pipe'
import { NgHighlightModule } from 'ngx-text-highlight';
import { OrdertabelComponent } from './components/ordertabel/ordertabel.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    CartComponent,
    OrdersComponent,
    SearchPipe,
    NewdialogComponent,
    UpdatedialogComponent,
    HighlightPipe,
    OrdertabelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    RxReactiveFormsModule,
    MatTabsModule,
    ResizableModule,
    NgMatSearchBarModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgHighlightModule
  ],
  entryComponents: [NewdialogComponent,UpdatedialogComponent,OrdersComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
