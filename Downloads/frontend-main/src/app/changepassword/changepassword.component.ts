import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  errorMessage: any;

  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar // Inject MatSnackBar here
  ) { }


  changePassword(changePasswordData: any) {
    this.authService.changePassword(changePasswordData).subscribe(
      response => {
        // Handle successful password change (if needed)
        this.snackBar.open('Password changed successfully', 'Close', {
          duration: 3000 // Snackbar duration in milliseconds
        });
      },
      error => {
        // Handle error
        this.errorMessage = error.error.message;
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 3000 // Snackbar duration in milliseconds
        });
      }
    );

}
}
