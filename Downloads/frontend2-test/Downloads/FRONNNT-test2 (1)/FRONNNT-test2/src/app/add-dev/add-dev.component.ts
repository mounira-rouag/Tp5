import { ChangeDetectorRef, Component } from '@angular/core';
import { Dev } from '../Models/dev.model';
import { versionService } from '../Services/version-service.service';
import { Maj } from '../Models/Maj.model';
import { UserServiceService } from '../Services/user-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { SiteService } from '../Services/sites-service.service';
import { Site } from '../Models/Sites.model';
import { DevService } from '../Services/dev-service.service';
import { ThemePalette } from '@angular/material/core';
import { Reverse } from '../Models/reverse.model';
import { ReverseService } from '../Services/reverse-service.service';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../Services/validation-service.sevice';
import { CDCService } from '../Services/cdc-service.service';
import { CDC } from '../Models/cdc.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FonctionService } from '../Services/fonctions-service.service';

import { StorageService } from '../Services/storage.service';
import { Fonction } from '../Models/fonction.model';
import { VersionMaj } from '../Models/versionMaj.model';
import { CablesService } from '../Services/cable-service.service';
import { EcuService } from '../Services/ecu-service.service';
import { FamilyService } from '../Services/familly-service.service';
import { PageEvent } from '@angular/material/paginator';
import { Ecu } from '../Models/ecu.model';
import { ValidationModal } from '../Models/ValidationModal';
import { MajService } from '../Services/Maj-service.service';
import { EtatDevService } from '../Services/etatdev-service.service';
import { EtatDev } from '../Models/etatDev.model';

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent {
  role = "user"
  idDev = this.route.snapshot.params['idDev']
  dev!: any;
  selectedVersion: any;
  visible: boolean | undefined;
  visible1: boolean | undefined
  visible2: boolean | undefined
  majs: any;
  selectedmaj: any;
  allUsers: any;
  Vehicules!: Vehicule[];
  sourceProducts!: Vehicule[];
  targetProducts!: Vehicule[];
  sites!: Site[];
  date2: Date | undefined;
  background: ThemePalette = undefined;

  reverses: any;
  myDev: any
  validations: any;
  cdc!: CDC[];
  cdc1!: CDC;
  dev1!: Dev;
  pageSize: number = 10;
  fonctionsByCdc: any;
  showRSBoard = false;
  showRSPouvoirBoard = false;
  showAdminBoard: any;
  user: any;
  showTable: any;
  private roles: string[] = [];
  isModificationAllowed = false;
  targetfonctions: Fonction[] = [];
  visible3 = false;
  fonction1: any;
  fonctionByDev!: Fonction[];
  fonctionsByCdcId!: Fonction[];
  allfonctions!: Fonction[]
  visible4 = false;
  versionsByValidation: any;
  Allcables: any;
  cablesByDev: any;
  ListType = "Véhicule";
  availableSubversions: any
  allValidations: any;
  Version: any;
  selectedIdVer: any;
  validationCreate = new ValidationModal()

  AllEcu: any;
  AllFamily: any;
  selectedFamily: any;
  ecu: any = {};
  fonctionsByCdc1: any;
  allEtatDev: any;
  allecuTypes: any;
  newEcu = new Ecu();
  isSuccessful = false;
  loading = false;
  enable=false;
  isduplicated=false;
  history="";
  onListTypeChange() {
    this.ListType = this.validationCreate.typeValid;
    this.getSousVeriosns();

  }

  getAllInjTypes() {
    this.ecuService.getAllInjTypes().subscribe(res => {
      this.allecuTypes = res;
    })
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  selectProduct(cdc: CDC) {
    this.dev.cdc = cdc;
    console.log("----new dev-----", this.dev)
    this.visibleTable=false;
  }


  showDialog() {
    this.visibleTable = true;
  }

  visibleTable = false
  getSeverity(signatureOk: string) {
    switch (signatureOk) {
        case 'true':
            return 'success';
        case 'false':
            return 'danger';
            default:
              return 'unknown';
    }
}
  onItemMove(event: any) {
    console.log(event.items)
    // this.fonctionsByCdc.remove(event.items)
    this.fonctionsByCdc = this.fonctionsByCdc.filter((i: any) => {
      return i.idFonction !== event.items[0].idFonction
    })
  }

  showDialog1() {
    // this.fonctionsByCdc = this.fonctionsByCdc1
    this.visible1 = true;
  }
  showDialog2() {
    this.visible2 = true;
  }
  showDialog4() {
    this.visible4 = true;
  }
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
    private etatDevsrvice: EtatDevService,
    private familyervice: FamilyService,
    private confirmationService: ConfirmationService



  ) {

  }

  ngOnInit(): void {
    console.log(this.isduplicated)
    this.user = this.storageService.getUser();
    this.role = this.user.roles;
    console.log("the role is ",this.role)
    if(this.role== "ROLE_ADMIN" || this.role=="ROLE_RS"|| this.role=="ROLE_RSPOUVOIR" ){
      this.isModificationAllowed=true;
    }else{
      this.isModificationAllowed=false;
    }
    console.log("allpwed",this.isModificationAllowed)
    
    this.getDevByID();
    this.getValidationByDev();
    this.getAdaptaeurByDev();
    this.getAllUser();
    //this.getAllVehicule();
    this.getVersioNbyDev();
    this.getAllInjTypes();
    this.getVehiculeByDev();
    this.getAllEcu();
    this.getAllFamily();
    this.getAllCdc();
    this.getAllEtatDev();
    this.getAllReverse();
    this.getAllSite();
    this.getAllVersion();
    this.getCdcByDev();
    this.getFonctionByDev();
    this.getFonctionByCdc();

    //this.getFonctionByDev()
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to save the changes ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
       

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancled ', detail: 'Operation Canceled ', life: 3000 });
      }
    });
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
                severity: 'Confirmed', 
                summary: 'Confirmed', 
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
  getAllEtatDev() {
    this.etatDevsrvice.getAllEtatDev().subscribe(res => {
      this.allEtatDev = res;
      console.log("all etat dev", this.allEtatDev)
    })
  }
  getVersioNbyDev() {
    console.log("versiobBydev")
    this.majervice.getMajByDev(this.idDev).subscribe(res => {
      this.Version = res;
      console.log("version is ", this.Version);
      this.getSousVeriosns();
    })

  }
  getSousVeriosns() {
    console.log("version is ", this.Version.idMaj);
    console.log("listType is ", this.ListType);

    this.majervice.getSubVersions(this.Version.idMaj, this.ListType).subscribe(res => {

      this.availableSubversions = res;
      console.log("all sous versiosns are here ", this.availableSubversions);

    })
  }


  selectFamily(family: any) {
    this.newEcu.famille = family;
    this.selectFamily=family
    console.log("selected Family is ",  this.selectFamily)
  }
  onVersion(Etat:EtatDev){
    
    console.log("selected maj is ",  Etat)
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


  updateEcu(Ecu: Ecu) {
    this.dev.ecu = Ecu;
  }
  getAllFamily() {
    this.familyervice.getAllFamily().subscribe(res => {
      this.AllFamily = res
      console.log("all families", this.AllFamily);
    })
  }

  /***selection des adaptateurs  */
  isAdaptateurExist(arrayOfObjects: any, idToFind: any) {
    return arrayOfObjects.some((obj: any) => obj.idCable === idToFind);
  }
  getAllCables() {
    this.cableService.getAllCables().subscribe(res => {
      this.Allcables = res
      this.Allcables = this.Allcables.filter((element: any) => {
        return !this.isAdaptateurExist(this.cablesByDev, element.idCable)
      });
    })

  }
  getAllEcu() {
    this.ecuService.getAllEcu().subscribe(res => {
      this.AllEcu = res;
    })

  }
  isfonctionsExist(arrayOfObjects: any, idToFind: any) {
    // console.log("idToFind" , idToFind)
    // console.log("arrayOfObjects" , arrayOfObjects)
    return arrayOfObjects.some((obj: any) => obj.idFonction === idToFind);
  }
  getAllFonctions() {
    this.fonctionService.getAllFonctions().subscribe(res => {
      this.allfonctions = res;

      this.allfonctions = this.allfonctions.filter((element: any) => {
        // console.log(element)
        return !this.isfonctionsExist(this.fonctionsByCdc1, element.idFonction)
      });
    })
  }
  
  getMajByValidation() {
    this.validations.forEach((validation: any) => {
      this.validationService.getVersionNameOfValidation(validation.idValid)
        .subscribe(versionName => {
          validation.versionName = versionName;
        });
    });
  }

  showDialogfonction(cdcId: number) {
    this.fonctionService.getFonctionByCdc(cdcId).subscribe(res => {
      this.fonctionsByCdcId = res;
      this.visible3 = true
      console.log("fonctions", cdcId, this.fonctionsByCdcId)
    })

  }
  onDeleteValidation(devId: number, validationId: number): void {
    this.devService.deleteValidationFromDev(devId, validationId).subscribe(
      () => {
        // Handle success: Update UI, display message, etc.
        console.log('Validation deleted successfully.');
        this.validations.remove()
        this.getAllValidation();
      },
      (error) => {
        // Handle error: Display error message, log, etc.
        console.error('Error deleting validation:', error);
      }
    );
    this.getValidationByDev();
  }
  creatValidation() {
    this.loading = true;

    this.selectedIdVer = this.validationCreate.idVer;
    this.ListType = this.validationCreate.typeValid;
    if (!this.validationCreate.idVer || !this.validationCreate.typeValid || !this.validationCreate.dateValid || !this.validationCreate.etatValid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out all the required fields.', life: 3000 });
      return;
    }
    console.log(this.selectedIdVer)
    this.validationService.createValidation(this.validationCreate, this.idDev)
      .subscribe(createdValidation => {


        this.visible2 = false;
        this.isSuccessful = true;
        this.dev.validation.push(createdValidation);
        this.validations = this.dev.validation;
        this.getValidationByDev()

        console.log('Validation created successfully:', createdValidation);
        this.messageService.add({ severity: 'Confirmed', summary: 'Confirmed', detail: 'Validation created successfully and added to the list.', life: 3000 });
      
      }, error => {

        console.error('Error creating validation:', error);
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating validation.', life: 3000 });
      });
  }

  getCdcByDev() {
    this.cdcService.getCdcByDev(this.idDev).subscribe(res => {
      this.cdc1 = res;
      this.fonction1 = this.cdc1.fonctions;


    })
  }
  getAllCdc() {
    this.cdcService.getAllCdc().subscribe(res => {
      this.cdc = res
    })
  }


  isFonctionCdcExist(arrayOfObjects: any, idToFind: any) {
    return arrayOfObjects.some((obj: any) => obj.IdFonction === idToFind);
  }

  getFonctionByCdc() {

    this.fonctionService.getFonctionByCdc(this.cdc1.idCdc).subscribe(res => {
      this.fonctionsByCdc = res;
      
      this.fonctionsByCdc = this.fonctionsByCdc.filter((element: any) => {
        return !this.isFonctionCdcExist(this.fonctionByDev, element.IdFonction)
      });
      this.fonctionsByCdc1 = this.fonctionsByCdc;
      console.log("this.fonctionsByCdc", this.fonctionsByCdc1)
      this.getAllFonctions();
    });
  }

  getFonctionByDev() {
    this.fonctionService.getFonctionByDevc(this.idDev).subscribe(res => {
      this.fonctionByDev = res;
      this.getFonctionByCdc();


    })

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
  console.log("cable by dev",this.cablesByDev);
}
  getAdaptaeurByDev() {
    this.cableService.getcABLESByDev(this.idDev).subscribe(res => {
      this.cablesByDev = res;
      this.getAllCables();
    })
  }
  getValidationByDev() {
    this.validationService.getValidationByDev(this.idDev).subscribe(res => {
      this.validations = res
      this.getMajByValidation();
    });



  }

  getAllValidation() {
    this.validationService.getAllValidation().subscribe(res => {
      this.allValidations = res
    })
  }
  getDevByID() {
    this.devService.getDevsById(this.idDev).subscribe(res => {
      this.myDev = res
      this.dev = this.myDev
      if (this.dev.devDuplique=true){
        this.isduplicated=true;
       this.history="Duplicated dev "
       console.log("is duplicated is ",this.isduplicated)
       console.log("the history is ",this.history)
        }else{
          this.isduplicated=false;
          this.history=" "
          console.log("is duplicated is ",this.isduplicated)
          console.log("the history is ",this.history)
        }
      console.log('-----mydev------', this.dev)
    })
  
   
  }

  getVehiculeByDev() {
    this.vehiculeService.getVehichulesByDev(this.idDev).subscribe(
      (data: Vehicule[]) => {
        this.targetProducts = data;
        console.log("target vehicules ", this.targetProducts)
        this.getAllVehicule();

      },
      (error: any) => {
        console.log("error", error);
      }
    )
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
  getAllUser() {
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res

    })
  }
  isVehiculeExist(arrayOfObjects: any, idToFind: any) {
    return arrayOfObjects.some((obj: any) => obj.codeVeh === idToFind);
  }

  getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.sourceProducts = data5;

        this.sourceProducts = this.sourceProducts.filter(((element: any) => {
          return !this.isVehiculeExist(this.targetProducts, element.codeVeh)
        }))


      },
      (error: any) => {
        console.log("error", error);
      }
    )
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
  getAllReverse() {
    this.reversService.getAllReverse().subscribe(
      (data: Reverse[]) => {
        this.reverses = data;
      },
      (error: any) => {
        console.log("error", error);
      }
    );

  }
  onSubmit() {
    console.log("submission", this.dev);
    this.dev.vehicules = this.targetProducts;
    this.dev.fonctions = this.fonctionByDev;
    this.dev.cables = this.cablesByDev;
    this.dev.menu=this.dev.menu
    this.dev.cdc=this.dev.cdc

    console.log('test', this.dev.cdc);
    
    this.devService.updateDev(this.idDev, this.dev)
      .subscribe(response => {
        this.cdr.detectChanges();
        console.log('Form data submitted successfully:', response);
        // You can show a success message to the user
        this.messageService.add({ severity: 'Confirmed', summary: 'Confirmed', detail: 'Dev Updated sucessfully' });
      }, error => {
        console.error('Error submitting form data:', error);
        // Handle the error here
        // You can show an error message to the user
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit form data. Please try again later.' });
      });
}

  toggleTable() {
    this.showTable = !this.showTable;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize
  }

}
