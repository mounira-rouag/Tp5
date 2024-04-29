import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FamilyService } from '../Services/familly-service.service';
import { MajService } from '../Services/Maj-service.service';
import { EcuService } from '../Services/ecu-service.service';
import { StorageService } from '../Services/storage.service';
import { CablesService } from '../Services/cable-service.service';
import { CDCService } from '../Services/cdc-service.service';
import { ValidationService } from '../Services/validation-service.sevice';
import { FonctionService } from '../Services/fonctions-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ReverseService } from '../Services/reverse-service.service';
import { SiteService } from '../Services/sites-service.service';
import { DevService } from '../Services/dev-service.service';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { versionService } from '../Services/version-service.service';
import { Site } from '../Models/Sites.model';
import { Vehicule } from '../Models/Vehicule.model';
import { Dev } from '../Models/dev.model';
import { Cables } from '../Models/cables.model';
import { CDC } from '../Models/cdc.model';
import { Menu } from '../Models/menu.model';

@Component({
  selector: 'app-ajout-dev',
  templateUrl: './ajout-dev.component.html',
  styleUrls: ['./ajout-dev.component.css']
})
export class AjoutDevComponent {
  sites!: Site[];
  majs: any;
  allUsers: any;
  sourceProducts!: Vehicule[];
  allfonctions: any;
  receivedCablesList: Cables[] = [];
  dev = new Dev;
  receivedVehiculesList: any[] = [];
  receiveCdc: any;
  receiveData: any;
  fonctionsByCdc: any[] = [];
  @Output() fonctionToChildEvent = new EventEmitter<any>();
  receiveData1: any;
  receivedEcu: any;
  receivedMenu: any;
  receivedValidations: any;

  constructor(private versionService: versionService,
    private userService: UserServiceService,
    private vehiculeService: VehiculeService,
    private cdr: ChangeDetectorRef,
    private devService: DevService,
    private siteService: SiteService,
    private reversService: ReverseService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fonctionService: FonctionService,
    private validationService: ValidationService,
    private cdcService: CDCService,
    private cableService: CablesService,
    private storageService: StorageService,
    private ecuService: EcuService,
    private majervice: MajService,

    private familyervice: FamilyService,
    private confirmationService: ConfirmationService



  ) {

  }
  ngOnInit(): void {

    console.log("fonctions in parent compnent", this.fonctionsByCdc)

  }
  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to create the dev ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
       


      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancled ', detail: 'Operation Canceled ', life: 3000 });
      }
    });
  }
  onSubmit() {
   
  
    // Assign values to dev object
    this.dev.vehicules = this.receivedVehiculesList;
    this.dev.cables = this.receivedCablesList;
    this.dev.cdc = this.receiveCdc;
    this.dev.devname = this.receiveData.devname;
    this.dev.devComment = this.receiveData.devComment;
    this.dev.bug = this.receiveData.bug;
    this.dev.dll = this.receiveData.dll;
    this.dev.maj = this.receiveData.maj;
    this.dev.sites = this.receiveData.site;
    this.dev.user = this.receiveData.user;
    this.dev.validations = this.receivedValidations;
    this.dev.maj = this.receiveData.maj;
    this.dev.etatdev = this.receiveData.etatdev;
    this.dev.menu = this.receivedMenu;
    this.dev.ecu = this.receivedEcu;
    this.dev.fonctions = this.receiveData.fonctions;
   
    console.log("9-----9",this.dev.validations , this.receivedValidations);
    

    // Log received data for debugging
    console.log("receivevalidation ", this.receiveData);
    console.log("receiveCdc ", this.receiveCdc);
    console.log("receivedVehiculesList ", this.receivedVehiculesList);
    console.log("this.fonctionsByCdc ", this.fonctionsByCdc);
    console.log("this.receivedEcu ", this.receivedMenu);
  
    // Call the registerDev service method
    this.devService.registerDev(this.dev).subscribe(
      res => {
        console.log("dev added successfully ", res);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Dev was created ', life: 3000 });
      },
      error => {
        console.error("Error adding Dev:", error);
        let errorMessage = 'An error occurred while adding Dev.';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;  // Use the error message sent from the backend
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      }
    );
  }
  
  sendDataToChild() {
    this.fonctionToChildEvent.emit(this.fonctionsByCdc);
  }
  receiveCdcfonctionsFromChild(fonctionsByCdcChange: any) {
    console.log('parent', fonctionsByCdcChange)
    this.fonctionsByCdc = fonctionsByCdcChange;
  }
  receiveEcuFromChild(DataEmit: any) {
    console.log("++++++++++++" + DataEmit)
    this.receivedEcu = DataEmit.ecu;
    this.receivedMenu = DataEmit.menu;
  }
  receiveValidation(validationsEvent:any){
    console.log("--------validation------",validationsEvent)
    this.receivedValidations=validationsEvent
  }
  receivedataFromChild(dataEvent: any) {
    console.log("this is dataevent", dataEvent)
    this.receiveData = dataEvent;
  }

  receiveCdcFromChild(CdcEmit: any) {
    this.receiveCdc = CdcEmit;

  }

  receiveCablesListFromChild(cablesList: any) {
    console.log("this.receivedCablesList", cablesList)
    this.receivedCablesList = cablesList;

  }
  receiveVehiculesListFromChild(VehiculesList: any) {
    this.receivedVehiculesList = VehiculesList;

  }


}
