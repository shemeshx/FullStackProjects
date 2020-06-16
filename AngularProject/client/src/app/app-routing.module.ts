import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageUComponent } from './components/homepage-u/homepage-u.component';
import { HomepageAComponent } from './components/homepage-a/homepage-a.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"homepageu",component:HomepageUComponent},
  {path:"homepagea",component:HomepageAComponent}, 
  {path:"",pathMatch:"full",redirectTo:"login"},
  {path:"**",redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
