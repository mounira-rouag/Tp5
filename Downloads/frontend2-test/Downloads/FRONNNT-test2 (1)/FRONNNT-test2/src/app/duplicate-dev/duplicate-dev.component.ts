import { ChangeDetectorRef, Component } from '@angular/core';
import { Dev } from '../Models/dev.model';
import { UserServiceService } from '../Services/user-service.service';
import { versionService } from '../Services/version-service.service';
import { DevService } from '../Services/dev-service.service';
import { SiteService } from '../Services/sites-service.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from '../Services/storage.service';
import { MajService } from '../Services/Maj-service.service';
import { Site } from '../Models/Sites.model';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { Maj } from '../Models/Maj.model';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-duplicate-dev',
  templateUrl: './duplicate-dev.component.html',
  styleUrls: ['./duplicate-dev.component.css']
})
export class DuplicateDevComponent {
dev=new Dev
idDev = this.route.snapshot.params['idDev']
  myDev: any;
  sites:any;
  majs: any;
  allUsers: User[]=[];
  selectedRow: any;
  selection = new SelectionModel<any>(true, []); 
  bugNumber:any
  menuControl = new FormControl();
  isAdaptateurConserved=false;
  isMenuConserved=false;
  comment:any
  IDuser:any
  IDsite:any
  IDmaj:any
  option:any
  newdev=new Dev
  filteredUsers: any;
  userInput='';
  options = [
    { idoption: 'optVeh', nomoption: 'Add/Delete a Vehicule' },
   
    { idoption: 'correctionbug', nomoption: ' Bug Correction ' },
    { idoption: 'OptCDC', nomoption: 'CDC evolution' }
];
  selectedConservationOptions: any;
  router: any;
constructor(private versionService: versionService,
  private userService: UserServiceService,
 
  private cdr: ChangeDetectorRef,
  private devService: DevService,
  private siteService: SiteService,
 
  private route: ActivatedRoute,
  private messageService: MessageService,
  private storageService: StorageService,
 
  private majervice: MajService,
  private confirmationService: ConfirmationService




) {

}
ngOnInit(){
  this.getDevByID();
  this.getAllSite();
  this.getAllUser();
  this.getVersions();
 

}



onSubmit() {
  if (!this.IDmaj || !this.IDsite || !this.IDuser || !this.option) {
    console.log("Validation failed: Required fields are missing.");
    // You can display an error message to the user here
    this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.', life: 3000 });
    return; // Exit the method if validation fails
  }
  console.log("idmaj:", this.IDmaj);
  console.log("idSite:", this.IDsite);
  console.log("iduser:", this.IDuser);
  console.log("options:", this.option);
  console.log("bugNumber:", this.bugNumber);
  console.log("isMenuConserved:", this.isMenuConserved);
  console.log("isAdaptateurConserved:", this.isAdaptateurConserved);
  console.log("is cOMMENT:", this.comment);
  console.log("the status of the  dev before ",this.dev.devDuplique)
  this.devService.DuplicateDev(this.myDev,this.IDmaj,this.IDsite,this.IDuser,this.isMenuConserved,this.option,this.bugNumber,this.isAdaptateurConserved,this.comment).subscribe(res=>{
    if (res && res.devDuplique) {
      
      this.messageService.add({ severity: 'warn', summary: 'Duplicate Dev', detail: 'The dev is already duplicated', life: 3000 });
    } else {
      this.newdev = res;
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Dev was Duplicated and added to the list', life: 3000 });
      location.reload();
    }
  },
  error => {
    console.error("Error duplicating Dev:", error);
    let errorMessage = 'An error occurred while duplicating Dev.';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
  }
);
  console.log("the status of the duplicated dev is ",this.dev.devDuplique)
  console.log("the status of the new duplicated dev is ",this.newdev.devDuplique)

}


confirm1(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to duplicate the Dev ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
          
          
      },
      reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancled', detail: 'operation cancled  ', life: 3000 });
      }
  });
}
onChange(data: any) {
  this.isMenuConserved = false;
  this.isAdaptateurConserved = false;
  data.value.forEach((i: any) => {
    if (i === 'conserveMenu') {
      if (!this.isMenuConserved) {
        this.isMenuConserved = true;
      }
    }

    if (i === 'conserveAdaptateurs') {
      if (!this.isAdaptateurConserved) {
        this.isAdaptateurConserved = true;
      }
    }
  });
  console.log("isMenuConserved:", this.isMenuConserved);
  console.log("isAdaptateurConserved:", this.isAdaptateurConserved);
}

onRowSelect(row: any) {
  this.selectedRow = row; // Update selectedRow on selection change
}
getVersions() {
  this.versionService.getversionsforDuplication(this.idDev).subscribe(
    (data1: any) => {
      this.majs = data1;
      console.log("version ", this.majs)
    },
    (error: any) => {
      console.log("error", error);
    }
  );
}
getAllUser() {
  this.userService.getAllUsers().subscribe(res => {
    this.allUsers = res
    console.log(this.allUsers)

  })
}

getAllSite() {
  this.siteService.getAllsites().subscribe(
    (data2: Site[]) => {
      this.sites = data2;
    },
    (error: any) => {
      console.log("error", error);
    }
  );
}
getDevByID() {
  this.devService.getDevsById(this.idDev).subscribe(res => {
    this.myDev = res
    this.dev = this.myDev
    console.log('-----mydev------', this.dev)
  })
}
}
