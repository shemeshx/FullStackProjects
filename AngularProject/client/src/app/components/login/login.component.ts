import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form:FormGroup
  constructor(public fb:FormBuilder,public usersS:UsersService,public router:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(4)]]
    })
    this.loginWithToken()
  }
  login(body){
    this.usersS.performLogin(body).subscribe(
      res=>{
        localStorage.setItem('token',res['token'])
        this.usersS.email=res['email']
        this.usersS.id=res['id']
        this.usersS.isAdmin=res['admin']
        if(this.usersS.isAdmin)
          this.router.navigateByUrl("/homepagea")
        else
          this.router.navigateByUrl("/homepageu")
      },
      err =>{
        alert("Please Enter exist user.")
      }
    );
  }
  loginWithToken(){
    this.usersS.performLogin({token:localStorage.getItem("token")}).subscribe(
      res=>{
        this.usersS.email=res['email']
        this.usersS.id=res['id']
        this.usersS.isAdmin=res['admin']
        if(this.usersS.isAdmin)
          this.router.navigateByUrl("/homepagea")
        else
          this.router.navigateByUrl("/homepageu")
      },
      err =>{
        console.log(err)
        localStorage.clear()
      }
    );
  }
}
