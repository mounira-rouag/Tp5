import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = true;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
   

  constructor(private authService: UserServiceService, private storageService: StorageService, private router: Router) { }
   // Define errorMessage property here
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.signIn(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        
        this.isLoggedIn = true;
        
        this.roles = this.storageService.getUser().roles;
       
        // Navigate to the profile page instead of reloading
      this.router.navigate(['/profil']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

/** 
  
  constructor(private authService: UserServiceService, private router: Router) { }
  
  signIn(signInFormData: any): void {
    const { username, password } = signInFormData;
    this.authService.signIn(username, password)
      .subscribe(
        response => {
          console.log('Sign-in successful:', response);
          // Handle success response, e.g., redirect to dashboard
          this.errorMessage = '';
          this.router.navigateByUrl('/');
        },
        error => {
          this.errorMessage = error.error.message; 
        }
      );
   
  }
*/
}
