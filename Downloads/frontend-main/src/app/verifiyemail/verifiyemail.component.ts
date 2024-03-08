import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifiyemail',
  templateUrl: './verifiyemail.component.html',
  styleUrls: ['./verifiyemail.component.css']
})
export class VerifiyemailComponent {
  errorMessage!: string;

  constructor(private userService: UserServiceService, private router: Router) { }

  verifyEmail(email: string): void {
    this.userService.verifyEmail(email).subscribe(
      response => {
        if (response.status === 200) {
          // Email exists, handle success
          this.router.navigate(['/change-password']);
          console.log('Email exists!');
          
          console.error('loged succesfully');
          // Handle success logic (e.g., navigate to change password)
        } else {
          // Handle error (email doesn't exist or other errors)
          console.error('Error verifying email:', response.statusText);
          this.router.navigate(['/change-password']);
        }
      },
      error => {
        console.error('Error verifying email:', error);
      },
      () => {
        console.log('Verification completed');
      }
    );
      
}
}
