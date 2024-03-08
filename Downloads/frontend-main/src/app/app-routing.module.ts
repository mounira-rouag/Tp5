import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifiyemailComponent } from './verifiyemail/verifiyemail.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { BoardAdminComponentComponent } from './board-admin-component/board-admin-component.component';
import { FirstviewComponent } from './firstview/firstview.component';

const routes: Routes = [
  
  {path: 'login',             component: LoginComponent},
  {path: 'signup',             component: SignupComponent},
 
  {path: 'change-password',             component:  ChangepasswordComponent},
  {path: 'email-verifiy',             component:   VerifiyemailComponent},
  {path: 'profil',             component:   ProfileComponentComponent},
  { path: 'admin',            component: BoardAdminComponentComponent },
  { path: 'firstview',            component: FirstviewComponent },
  
  
  { path: '', redirectTo: 'firstview', pathMatch: 'full' }

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
