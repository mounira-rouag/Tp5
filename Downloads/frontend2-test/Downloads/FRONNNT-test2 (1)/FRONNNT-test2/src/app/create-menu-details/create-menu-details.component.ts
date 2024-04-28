import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FamilyService } from '../Services/familly-service.service';
import { EcuService } from '../Services/ecu-service.service';
import { ActivatedRoute } from '@angular/router';
import { ReverseService } from '../Services/reverse-service.service';
import { SiteService } from '../Services/sites-service.service';
import { DevService } from '../Services/dev-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { versionService } from '../Services/version-service.service';
import { Ecu } from '../Models/ecu.model';
import { Menu } from '../Models/menu.model';
import { Dev } from '../Models/dev.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-menu-details',
  templateUrl: './create-menu-details.component.html',
  styleUrls: ['./create-menu-details.component.css']
})
export class CreateMenuDetailsComponent {
  AllFamily: any;
  AllEcu: any;
  ecu = new Ecu
  menu = new Menu
  dev = new Dev;
  allecuTypes: any;
  
  @Output() DataEmit: EventEmitter<any> = new EventEmitter<any>();
  enable=false;
  constructor(private versionService: versionService,
    private userService: UserServiceService,

    private cdr: ChangeDetectorRef,
    private devService: DevService,
    private siteService: SiteService,
    private reversService: ReverseService,
    private route: ActivatedRoute,

    private ecuService: EcuService,
    private messageService: MessageService ,
    private familyervice: FamilyService,
    private confirmationService: ConfirmationService


  ) {

  }

  ngOnInit(): void {
    this.getAllEcu();
    this.getAllFamily();
    this.getAllInjTypes();

    this.emitEcu();
  }

  
  selectFamily(family: any) {
    this.ecu.famille = family;
    console.log("selected Family is ", family)

  }


  getAllEcu() {
    this.ecuService.getAllEcu().subscribe(res => {
      this.AllEcu = res;
    })

  }
  emitEcu() {
    const data = {
      ecu: this.ecu,
      menu: this.menu
    }
    this.DataEmit.emit(data);
    console.log("data to be sent", data);
  }

  updateEcu(Ecu: Ecu) {
    this.ecu = Ecu;
    this.emitEcu()
  
  }


  getAllInjTypes() {
    this.ecuService.getAllInjTypes().subscribe(res => {
      this.allecuTypes = res;
    })
  }


  confirm3(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to save new Calculator ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createEcu();



      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancled ', detail: 'Operation Canceled ', life: 3000 });
      }
    });
  }

  createEcu() {
    this.ecu.famille = this.selectFamily;
    this.ecuService.createEcu(this.ecu).subscribe(
        res => {
            console.log('ECU created successfully:', res);
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: 'Ecu was created and added to the list of ECU', 
                life: 3000 
            });
            this.getAllEcu();
        },
        error => {
            console.error('Error creating ECU:', error);
            let errorMessage = 'An error occurred while creating ECU.';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = ` ${error.error}`;
            }

            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: errorMessage, 
                life: 3000 
            });
        }
    );
}
onFamilySelected(selectedValue: any) {
  console.log('Selected family (using change event):', selectedValue);
 const type=selectedValue.nomfamille;
 
 if (type.toLowerCase().startsWith("inj")) {
  this.enable = true;
} else {
  this.enable = false;
}
}

  getAllFamily() {
    this.familyervice.getAllFamily().subscribe(res => {
      this.AllFamily = res
      console.log("all families", this.AllFamily);
    })
  }



}
