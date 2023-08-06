import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[authGuard]},

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent,canActivate:[authGuard]},

  {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},

  {path:'post' ,component:AllPostComponent, canActivate:[authGuard]},
  {path:'post/new',component:NewPostComponent,canActivate:[authGuard]},
  {path:'edit',component:EditPostComponent,canActivate:[authGuard]},

  {path:'subscribers',component:SubscribersComponent,canActivate:[authGuard]},


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
