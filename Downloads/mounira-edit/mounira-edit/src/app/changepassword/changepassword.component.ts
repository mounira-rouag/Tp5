import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';
import { StorageService } from '../Services/storage.service';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  errorMessage: String ='';
  user: User | undefined;
  isSuccessful = false;
  isFailed=false;
  sucessMessage:string='password changed sucessfully';
  loading = false

  constructor(
    private authService: UserServiceService,
    private snackBar: MatSnackBar,
  private storegService:StorageService
  ) {
  this.user = this.storegService.getUser();
    console.log(this.user = this.storegService.getUser());
   }

/** 
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
        
      }
    );*/


    changePassword(changePasswordData: any,connectedUser: any) {
      this.loading = true;
      const accessToken = connectedUser.access_token;
      console.log(changePasswordData);
      console.log(accessToken);      
      this.authService.changePassword(changePasswordData, connectedUser).subscribe({
        next: (response) => {
         
          this.isSuccessful=true;  
          this.sucessMessage=response.message;
          console.log(this.isSuccessful)
          this.loading = false;
        },
        error: (error) => {
        this.isFailed=true;
          // Extract error message (handle potential missing message)
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      }
       
      );
        
       
      }
  
  }


  

    
  
