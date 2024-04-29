import { Component } from '@angular/core';
import { MajService } from '../Services/Maj-service.service';
import { SiteService } from '../Services/sites-service.service';
import { StorageService } from '../Services/storage.service';
import { Dev } from '../Models/dev.model';
import { versionService } from '../Services/version-service.service';
import { DevService } from '../Services/dev-service.service';
//import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-etat-valid',
  templateUrl: './etat-valid.component.html',
  styleUrls: ['./etat-valid.component.css']
})
export class EtatValidComponent {
  alldev!: Dev[];
  loading= false;
  majs: any;
  selectedVersion:any

  constructor(
    private storageService: StorageService,
    private devService: DevService,
    private siteService: SiteService,
    private majService: MajService,
    private versionService: versionService,
  
  ) { 
    
  }
  ngOnInit(): void {

    this.getAllVersion();
   
    this.getdevEnCours();
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

getdevEnCours(){
  this.loading=true;
  this.devService.getDevByVersionEnCours().subscribe(res=>{
    this.alldev=res;
    this.loading=false;
  },
  (error: any) => {
    console.log("error", error);
    this.loading=false;
  })
}

// exportExcel() {
//   import('xlsx').then((xlsx) => {
//       const worksheet = xlsx.utils.json_to_sheet(this.alldev);
//       const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
//       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//       this.saveAsExcelFile(excelBuffer, 'products');
//   });
// } 
// saveAsExcelFile(buffer: any, fileName: string): void {
//   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//   let EXCEL_EXTENSION = '.xlsx';
//   const data: Blob = new Blob([buffer], {
//       type: EXCEL_TYPE
//   });
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
// }
  getDevsByVersion(selectedmaj: any) {
    this.loading = true;
   
    this.majService.getDevsByVersion(selectedmaj).subscribe(
      (data4: Dev[]) => {
        this.alldev = data4;
        this.loading=false

 console.log("the list initiale of devs",this.alldev)
        
      },
      (error: any) => {
        console.log("error fetching devs by version", error);
        this.loading = false;
      }
    );
  }
  searchCDCByFilters(){
    this.loading=true;
this.devService.findDevsByVersion(this.selectedVersion.idMaj).subscribe(res=>{
  this.alldev=res;
  this.loading=false;
})
  }
}