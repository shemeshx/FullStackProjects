import { Component,  OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Idan's Market";
  
  constructor(public userS: UsersService) { }
  ngOnInit() {
  }



}
