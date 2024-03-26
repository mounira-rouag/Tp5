import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StorageService } from '../Services/storage.service';
import { UserServiceService } from '../Services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../Models/User.model';
import { Site } from '../Models/Sites.model';
import { Maj } from '../Models/Maj.model';
import { Marque } from '../Models/Marque.model';
import { Dev } from '../Models/dev.model';
import { PageEvent } from '@angular/material/paginator';
import { VehiculeService } from '../Services/Vehicule-service.service';
import { Vehicule } from '../Models/Vehicule.model';
import { MajService } from '../Services/Maj-service.service';
import { DevService } from '../Services/dev-service.service';
import { MarqueService } from '../Services/marques-service.service';
import { Version } from '@angular/compiler';
import { versionService } from '../Services/version-service.service';
import { SiteService } from '../Services/sites-service.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-gestion-dev',
  templateUrl: './gestion-dev.component.html',
  styleUrls: ['./gestion-dev.component.css']
})
export class GestionDevComponent implements OnInit {
  filters: any;
  showAdminBoard: any;
  onMarqueChange($event: any) {
    throw new Error('Method not implemented.');
  }

  selectedMarque!: number;
  selectedSite: any;
  
  selectedmaj: any
  selectedVersion: any;
  selectedDevNumber: any;
  selectemodel: any;
 
  pageSize: number = 10;
  searchcritiria: any;
  debounceTimeout: any;
  dll: string = '';
  numberdev: number = 0;
  id: number = 0;
  marques: Marque[] = [];
  majs: Maj[] = [];
  sites: Site[] = [];
  users: User[] = [];
  devs: Dev[] = [];
  Vehicules: Vehicule[] = [];
  Vehicules1: Vehicule[] = [];
  showTable: any;
  pageEvent: PageEvent = new PageEvent;
  filteredDevs!: Dev[];
  filterId = '';
  showModeratorBoard = false;
  alldev: any;
  private roles: string[] = [];
  selectedProducts!: Dev;
  items: MenuItem[] | undefined;
  visible: boolean = false;

  loading: boolean = true;
  customDialogClass = 'no-shadow';
  activityValues: number[] = [0, 100];


  @ViewChild('dllInput') dllInput: any;

  constructor(private authService: UserServiceService,
    private storageService: StorageService,
    private router: Router, private http: HttpClient,
    private vehiculeService: VehiculeService,
    private devService: DevService,
    private versionService: versionService,
    private marqueService: MarqueService,
    private siteService: SiteService,
    private majService: MajService,
    ) { }


  ngOnInit(): void {
   
 
    this.getAllMarques()
    this.getAllSite()
    this.getAllVersion()
    //this.getDevsByVersion(2)
   
    this.getAllVehicule()
    this.getAllDev()

    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    
    
  }
  

  showDialog(selectedDevNumber:any) {
    this.visible = true; 
    
    this.vehiculeService.getVehichulesByDev(selectedDevNumber).subscribe(
      (data:Vehicule[])=>{
        this.Vehicules=data;
      },
      (error: any) => {
        console.log("error", error);
      });
  }

  clear(table: any) {
    table.clear();
  }



  getAllDev() {
    this.loading=true;
    this.devService.getAllDev().subscribe(res => {
      this.alldev = res
      console.log(this.alldev,"this devs");
      this.loading=false;
    })

  }

  getAllVehicule() {
    this.vehiculeService.getAllVehicules().subscribe(
      (data5: Vehicule[]) => {
        this.Vehicules = data5;
        console.log(this.Vehicules,"vehicules ksit");
      },
      (error: any) => {
        console.log("error", error);
      }
    )
  }

  getDevsByVersion(idmaj: any) {
    this.loading=true;
    this.majService.getDevsByVersion(idmaj).subscribe(
      (data4: Dev[]) => {
        this.alldev = data4;
        console.log('getDevsByVersion', this.alldev)
        console.log("with version 4",this.alldev);
        this.loading=false;
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

  getAllMarques() {
    this.marqueService.getAllMarques().subscribe(
      (data: any) => {
        this.marques = data;
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

showVehicles(selectedDevNumber:any){

this.vehiculeService.getVehichulesByDev(selectedDevNumber).subscribe(
  (data:Vehicule[])=>{
    this.Vehicules=data;
  },
  (error: any) => {
    console.log("error", error);
  }
)
  
}
/** 
  filterDevs() {
    this.filteredDevs = this.devs.filter((dev) => {
      let include = true;
      for (const key in this.filters) {
        if (this.filters.hasOwnProperty(key)) {
          const filterValue = this.filters[key].toString().toLowerCase();
          const devValue = dev?.id?.toString().toLowerCase() || '';

          include = include && (devValue.includes(filterValue) || filterValue === '');
        }
      }
      return include;
    });
  }*/

  searchDevsByFilters() {
    const marqueId = this.selectedMarque;
    const siteId = this.selectedSite;
    const idmaj = this.selectedVersion;
    const modelCode = this.selectemodel;
    console.log("Selected Marque ID:", this.selectedMarque);
    console.log("Selected version ID:", this.selectedmaj);
    console.log("Selected site ID:", this.selectedSite);
    console.log("Selected vehicule ID:", this.selectemodel);
    this.loading=true;

    this.devService.findDevsByCriteria(marqueId, siteId, idmaj, modelCode).subscribe(
      (data4: Dev[]) => {
        this.alldev = data4;
        console.error('alldev',this.alldev);
        this.loading=false;
      },
      (error) => {
        // Handle error
        console.error('Error fetching developers:', error);
      }
    );
  }

  toggleTable() {
    this.showTable = !this.showTable;
  } 
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize
  }
  reset() {
    
    this.selectedMarque=0;
    this.selectedSite=0;
    this.selectedVersion=0;
    this.selectemodel=0;

    // ... etc.
  }

}
