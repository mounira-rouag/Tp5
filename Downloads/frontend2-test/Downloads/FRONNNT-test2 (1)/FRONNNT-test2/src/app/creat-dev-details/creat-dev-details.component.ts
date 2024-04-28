import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Version } from '@angular/core';
import { versionService } from '../Services/version-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { DevService } from '../Services/dev-service.service';
import { SiteService } from '../Services/sites-service.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FonctionService } from '../Services/fonctions-service.service';
import { ValidationService } from '../Services/validation-service.sevice';
import { StorageService } from '../Services/storage.service';
import { MajService } from '../Services/Maj-service.service';
import { Site } from '../Models/Sites.model';
import { Dev } from '../Models/dev.model';
import { ValidationModal } from '../Models/ValidationModal';
import { CDCService } from '../Services/cdc-service.service';
import { Fonction } from '../Models/fonction.model';
import { CDC } from '../Models/cdc.model';
import { EtatDevService } from '../Services/etatdev-service.service';
import { Validation } from '../Models/validation.model';
import { Maj } from '../Models/Maj.model';


@Component({
  selector: 'app-creat-dev-details',
  templateUrl: './creat-dev-details.component.html',
  styleUrls: ['./creat-dev-details.component.css']
})
export class CreatDevDetailsComponent {
  dev = new Dev();
  majs: any;
  sites!: Site[];
  allUsers: any;
  allfonctions: any;
  validations: Validation[] = [];

  visible2 = false;
  Version: any;
  validationCreate = new ValidationModal()
  selectedIdVer!: number;
  ListType = "Véhicule";
  visible1 = false;

  fonctionByDev: Fonction[] = [];
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() fonctionsByCdc: Fonction[] = [];
  @Input() receiveData: any;
  @Output() validationsEvent: EventEmitter<any> = new EventEmitter<any>();

  receivedData: any;
  @Output() fonctionsByCdcChange = new EventEmitter<any[]>();
  allEtatDev: any;
  availableSubversions: any;
  selectedVersion!: Maj;

  constructor(private versionService: versionService,
    private userService: UserServiceService,

    private cdr: ChangeDetectorRef,

    private devService: DevService,
    private siteService: SiteService,
    private cdcService: CDCService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fonctionService: FonctionService,
    private validationService: ValidationService,

    private storageService: StorageService,
    private etatDevsrvice: EtatDevService,
    private majervice: MajService,
    private confirmationService: ConfirmationService





  ) {

  }
  ngOnInit(): void {

    console.log(this.fonctionsByCdc)

    this.getAllUser();

    this.getAllFonctions();
    this.getAllEtatDev();

    this.getAllSite();
    this.getAllVersion();

    this.sendData();
    this.getSousVeriosns();

  }
 
  receiveDataFromParent() {
    this.receivedData = this.fonctionsByCdc;
  }
  onListTypeChange() {
    this.ListType = this.validationCreate.typeValid;
    this.getSousVeriosns();

  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to create the validation  ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.creatValidation()



      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancled ', detail: 'Operation Canceled ', life: 3000 });
      }
    });
  }
  getMajByValidation() {
    this.validations.forEach((validation: any) => {
      this.validationService.getVersionNameOfValidation(validation.idValid)
        .subscribe(versionName => {
          validation.versionName = versionName;
        });
    });


  }
  sendData() {
    const data = {
      name: this.dev.devname,
      comment: this.dev.devComment,
      bug: this.dev.bug,
      dll: this.dev.dll,
      devloper: this.dev.user,
      version: this.dev.maj,
      site: this.dev.sites,
      validation:this.validations,
      etatdev:this.dev.etatdev,
      maj:this.dev.maj,
      fonctions:this.fonctionByDev
    };
  
    this.dataEvent.emit(data);
  }
  emitValidations(){
    this.validationsEvent.emit(this.validations);
  }

  onVersionChange(version: any) {
    this.selectedVersion = version;
    this.dev.maj=version;
    console.log("selected maj", this.selectedVersion)
    this.ListType = "Véhicule"
    this.getSousVeriosns();
  }
  getSousVeriosns() {
    console.log("version is ", this.selectedVersion);
    console.log("listType is ", this.ListType);

    this.majervice.getSubVersions(this.selectedVersion.idMaj, this.ListType).subscribe(res => {

      this.availableSubversions = res;
      console.log("all sous versiosns are here ", this.availableSubversions);

    })
  }

  showDialog2() {
    this.visible2 = true;
  }
  showDialog1() {
    // this.fonctionsByCdc = this.fonctionsByCdc1
    this.visible1 = true;
    this.receiveDataFromParent()
    console.log("received fonctions", this.fonctionsByCdc)
  }

  getAllEtatDev() {
    this.etatDevsrvice.getAllEtatDev().subscribe(res => {
      this.allEtatDev = res;
      console.log("all etat dev", this.allEtatDev)
    })
  }


  DeleteValidation(validationId: number): void {
    if (this.dev && this.dev.validation) {
      const validationIndex = this.dev.validation.findIndex(validation => validation.idValid === validationId);
      if (validationIndex !== -1) {
        this.dev.validation.splice(validationIndex, 1);
        console.log('Validation removed successfully from Dev object.');
        console.log(this.dev.validation)
      } else {
        console.warn('Validation with ID', validationId, 'not found in Dev');
      }
    } else {
      console.warn('Dev or dev.validation is undefined');
    }
  }
  creatValidation() {
    


    this.selectedIdVer = this.validationCreate.idVer;
    this.ListType = this.validationCreate.typeValid;
    if (!this.validationCreate.idVer || !this.validationCreate.typeValid || !this.validationCreate.dateValid || !this.validationCreate.etatValid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out all the required fields.', life: 3000 });
      return;
    }
    console.log(this.dev.validation)
    this.validationService.createValidationwithnewDev(this.validationCreate)
      .subscribe(createdValidation => {


        this.visible2 = false;

        this.dev.validation.push(createdValidation);
        this.validations = this.dev.validation;
        this.getMajByValidation();
        console.log("validations with dev are ", this.validations);

        console.log('Validation created successfully:', createdValidation);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Validation created successfully and added to the list.', life: 3000 });



      }, error => {

        console.error('Error creating validation:', error);

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating validation.', life: 3000 });
      });
  }
  getFonctionByDev() {
    this.fonctionService.getFonctionByDevc(this.dev.id).subscribe(res => {
      this.fonctionByDev = res;



    })

  }

  getAllVersion() {
    this.versionService.getAllversions().subscribe(
      (data1: any) => {
        this.majs = data1;
        console.log("version ", this.majs)
      },
      (error: any) => {
        console.log("error", error);
      }
    );
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

  getAllUser() {
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res

    })
  }



  getAllFonctions() {
    this.fonctionService.getAllFonctions().subscribe(res => {
      this.allfonctions = res;

    })
  }




  onSubmit() {
    console.log(this.dev);
    this.dev.validation = this.validations;
    this.dev.fonctions = this.fonctionByDev;
    this.devService.registerDev(this.dev).subscribe(res => {
      console.log("dev added succesfully ", res);
    })
  }
}
