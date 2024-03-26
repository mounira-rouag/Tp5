import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifiyemailComponent } from './verifiyemail/verifiyemail.component';
import { httpInterceptorProviders } from './Services/auth-interceptor.service';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { BoardAdminComponentComponent } from './board-admin-component/board-admin-component.component';
import { FirstviewComponent } from './firstview/firstview.component';
import { FooterComponent } from './footer/footer.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GestionDevComponent } from './gestion-dev/gestion-dev.component';
import { TestComponent } from './test/test.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ChangepasswordComponent,
    VerifiyemailComponent,
    ProfileComponentComponent,
    HomeComponentComponent,
    BoardAdminComponentComponent,
    FirstviewComponent,
    FooterComponent,
    ResetpasswordComponent,
    GestionDevComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule to imports
    MatSnackBarModule,
    DialogModule,
    ButtonModule,
    MatPaginatorModule // Add MatSnackBarModule to imports
   
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
