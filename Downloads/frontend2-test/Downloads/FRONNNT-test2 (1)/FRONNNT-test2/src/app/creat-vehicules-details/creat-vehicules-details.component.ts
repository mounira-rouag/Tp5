import { Component, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { Dev } from '../Models/dev.model';

@Component({
  selector: 'app-creat-vehicules-details',
  templateUrl: './creat-vehicules-details.component.html',
  styleUrls: ['./creat-vehicules-details.component.css']
})
export class CreatVehiculesDetailsComponent {
  VehiculesWithDev: Vehicule[]=[];
  dev = new Dev();
  AllVehicules!: Vehicule[];

  @Output() VehiculesList: EventEmitter<any> = new EventEmitter<any>();

  constructor(private vehiculeService: VehiculeService,
    private userService: UserServiceService,
  ) {

  }
ngOnInit(){

  this.getAllVehicule();
  this.emitVehiculesList();
}


emitVehiculesList() {
  this.VehiculesList.emit(this.VehiculesWithDev);
  console.log("vehicues list is ",this.VehiculesList);
}



  getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.AllVehicules = data5;
      },
      (error: any) => {
        console.log("error", error);
      }
    )
  }



  onMoveToSource(event: any) {
    // Handle item moved from target to source list
    const removedItem = event.items;
    // Assuming 'id' is the unique identifier of the item
    const index = this.VehiculesWithDev.findIndex((item: any) => item.id === removedItem.id);
    if (index === -1) {
        this.VehiculesWithDev.push(removedItem);
    }
    console.log(this.VehiculesWithDev);
}

onMoveToTarget(event: any) {
    // Handle item moved from source to target list
    const addedItem = event.items;
    const index = this.VehiculesWithDev.findIndex((item: any) => item.id === addedItem.id);
    if (index !== -1) {
        this.VehiculesWithDev.splice(index, 1);
    }
    console.log(this.VehiculesWithDev);
}
}
