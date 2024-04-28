import { Component, EventEmitter, Output } from '@angular/core';
import { CablesService } from '../Services/cable-service.service';
import { Cables } from '../Models/cables.model';

@Component({
  selector: 'app-create-adaptateur-details',
  templateUrl: './create-adaptateur-details.component.html',
  styleUrls: ['./create-adaptateur-details.component.css']
})
export class CreateAdaptateurDetailsComponent {
  Allcables: any;
  cablesByDev!:any;
 
  @Output() cablesList: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    
    private cableService: CablesService,


  ) {

  }

  ngOnInit(): void {
    this.getAllCables();
    this.cablesByDev=[];
    this.emitCablesList()
  }

  emitCablesList() {
    this.cablesList.emit(this.cablesByDev);
    console.log("cable list is ",this.cablesList);
  }
  getAllCables() {
    this.cableService.getAllCables().subscribe(res => {
      this.Allcables = res
      
     
    })
  
  }
  onSourceChange(event: any) {
    console.log('Source list changed:', event);
  }
 

  onMoveToSource(event: any) {
   
    const removedItem = event.items;
    
    const index = this.cablesByDev.findIndex((item: any) => item.id === removedItem.id);
    if (index === -1) {
        this.cablesByDev.push(removedItem);
    }
    console.log("cables by dev are ",this.cablesByDev);
}

onMoveToTarget(event: any) {
    // Handle item moved from source to target list
    const addedItem = event.items;
    const index = this.cablesByDev.findIndex((item: any) => item.id === addedItem.id);
    if (index !== -1) {
        this.cablesByDev.splice(index, 1);
    }
    console.log(this.cablesByDev);
}

}
