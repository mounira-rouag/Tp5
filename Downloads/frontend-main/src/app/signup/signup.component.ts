import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  selectedRoles: string[] = [];
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signUp(signUpData: User) {
    signUpData.roles = this.selectedRoles;
    this.authService.registerUser(signUpData).subscribe({
      next: (response) => {
        // Handle successful signup
        alert('Registration successful!'); // Display success message directly to the user
  
        // Optional: Additional actions after success (e.g., redirect to another page)
        // ...
      },
      error: (error) => {
        // Handle signup error
  
        // Extract error message (handle potential missing message)
        const errorMessage = error.error?.message || 'An error occurred during registration. Please try again.';
  
        alert(errorMessage); // Display error message directly to the user
      }
    });
  }
}
