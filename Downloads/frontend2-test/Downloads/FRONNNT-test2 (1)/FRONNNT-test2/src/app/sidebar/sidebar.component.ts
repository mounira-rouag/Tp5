import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { UserServiceService } from '../Services/user-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  roles: string[] = [];
  
 
  showModeratorBoard = false;
  username?: string;
  

 
  isLoggedIn= this.tokenStorageService.isLoggedIn() ;
  
 
  showAdminBoard = this.roles.includes('ROLE_ADMIN')
  showRSPouvoirBoard: boolean=false;
  showRSBoard: boolean=false;
  
  constructor( private userService: UserServiceService,private tokenStorageService: StorageService) { }
   @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: Event): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;
ngOnInit(){
  this.isLoggedIn = this.tokenStorageService.isLoggedIn();

  if(this.isLoggedIn) {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_RC');
    this.showRSBoard = this.roles.includes('ROLE_RS');
    this.showRSPouvoirBoard = this.roles.includes('ROLE_RSPOUVOIR');
    this.username = user.username;
   
  }
  console.log(this.isLoggedIn);
}

signOut(): void {
  // Call your service method for logout
  
      window.sessionStorage.clear();
      window.location.href = '/firstview';
}
}

