import { ChangeDetectorRef, Component } from '@angular/core';
import { Dev } from '../Models/dev.model';
import { versionService } from '../Services/version-service.service';
import { Maj } from '../Models/Maj.model';
import { UserServiceService } from '../Services/user-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { VehiculeService } from '../Services/Vehicule-service.service';

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent {
dev! :Dev;
selectedVersion: any;
visible:boolean | undefined;
majs: Maj[] = [];
selectedmaj: any;
  allUsers: any;
  Vehicules!: Vehicule[];
  sourceProducts!: Vehicule[];

    targetProducts!: Vehicule[];
showDialog() {
  this.visible = true;
}
constructor( private versionService: versionService,
  private userService: UserServiceService,
  private vehiculeService: VehiculeService,
  private cdr: ChangeDetectorRef){}

ngOnInit(): void {
   
 
this.getAllVersion();
this.getAllUser();
this.getAllVehicule();
this.targetProducts=[];
}
 


 
getAllVersion() {
  this.versionService.getAllversions().subscribe(
    (data1: Maj[]) => {
      this.majs = data1;
    },
    (error: any) => {
      console.log("error", error);
    }
  );
}
getAllUser(){
  this.userService.getAllUsers().subscribe(res => {
    this.allUsers = res
    console.log(this.allUsers,"allusers");
  
  })
}
getAllVehicule() {
  this.vehiculeService.getAllVehicules().subscribe(
    (data5: Vehicule[]) => {
      this.sourceProducts  = data5;
      console.log(this.sourceProducts,"vehicules ksit");
      
      this.cdr.markForCheck();
    },
    (error: any) => {
      console.log("error", error);
    }
  )
}
 
}
