import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  private roles: string[] = [];
  
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  

 
  isLoggedIn= this.tokenStorageService.isLoggedIn() ;
  
 
  
  
  constructor( private userService: UserServiceService,private tokenStorageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
     
    }
    console.log(this.isLoggedIn);
  }

  /**
  signOut(): void {
    this.tokenStorageService.logout().subscribe({
      next: (res: any) => {
        console.log(res);
        this.tokenStorageService.clean();

        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }*/
 
  signOut(): void {
    // Call your service method for logout
    
        window.sessionStorage.clear();
        window.location.href = '/login';
  }
}
