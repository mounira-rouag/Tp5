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

@Component({
  selector: 'app-add-dev',
  templateUrl: './add-dev.component.html',
  styleUrls: ['./add-dev.component.css']
})
export class AddDevComponent {
  role = "user"
  idDev = this.route.snapshot.params['idDev']
  dev!: Dev;
  selectedVersion: any;
  visible: boolean | undefined;
  visible1: boolean | undefined
  visible2: boolean | undefined
  majs: Maj[] = [];
  selectedmaj: any;
  allUsers: any;
  Vehicules!: Vehicule[];
  sourceProducts!: Vehicule[];
  targetProducts!: Vehicule[];
  sites!: Site[];
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  devname: any;
  reverses: any;
  myDev:any
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }
  form = {
    devname: '',
   version:'',
    dll: '',
    site: 0,
    developer: 0,
    typeDev: '',
    history: '',
    devComment: '',
    bug: '',
    cdc : {
      nomCdc : '',

      refCdc: '',
      indCdc: '',
      creation: Date, 
      signatureOk: '',
      refCdcArdia: '',

    },
    vehicules:{

    },
    user:{
      firstname: '',
      lastname: '',
      username: 'hello',
      email: '',
      password: '',
      site:{
        idSite:0,
        NomSite:''

      }
    },
    maj:{
      nomMaj: '',
    typeMaj: '' ,  // Allow null for optional typeMaj
    statusMaj: '' ,  // Allow null for optional statusMaj
    ordre: '',
    enCours: ''  ,   // Allow null for optional enCours
    atalMaj: ''  ,   // Allow null for optional atalMaj
    nomMajOffice: ''  
    }
  };



  showDialog() {
    this.visible = true;
  }

  showDialog1() {
    this.visible1 = true;
  }
  showDialog2() {
    this.visible2 = true;
  }
  constructor(private versionService: versionService,
    private userService: UserServiceService,
    private vehiculeService: VehiculeService,
    private cdr: ChangeDetectorRef,
    private devService: DevService,
    private siteService: SiteService,
    private reversService: ReverseService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.getDevByID()
    this.getAllVersion();
    this.getAllUser();
    this.getAllVehicule();
    this.targetProducts = [];
    this.getAllSite();
    this.getAllReverse();
  }

  getDevByID(){
    this.devService.getDevsById(this.idDev).subscribe(res=>{
      this.myDev = res
      this.form = this.myDev
      console.log('-----hene------',this.form)
    })
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
  getAllUser() {
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res
      console.log(this.allUsers, "allusers");

    })
  }

  getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.sourceProducts = data5;
        console.log(this.sourceProducts, "vehicules ksit");

        this.cdr.markForCheck();
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
        console.log(this.sites)
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

    this.devService.registerDev(this.form)
      .subscribe(response => {
        // Handle successful response (optional)
        console.log('Form data submitted successfully:', response);
      }, error => {
        // Handle errors (important)
        console.error('Error submitting form data:', error);
      });
  }

}
