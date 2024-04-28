import { Component, EventEmitter, Output } from '@angular/core';
import { Site } from '../Models/Sites.model';
import { Reverse } from '../Models/reverse.model';
import { CDC } from '../Models/cdc.model';
import { FonctionService } from '../Services/fonctions-service.service';
import { CDCService } from '../Services/cdc-service.service';
import { SiteService } from '../Services/sites-service.service';
import { ReverseService } from '../Services/reverse-service.service';
import { Fonction } from '../Models/fonction.model';
import { MessageService } from 'primeng/api';
import { versionService } from '../Services/version-service.service';

@Component({
  selector: 'app-cdc-manegment',
  templateUrl: './cdc-manegment.component.html',
  styleUrls: ['./cdc-manegment.component.css']
})
export class CdcManegmentComponent {
  reverses!: Reverse[];
  sites!: Site[];
  cdc1: any;
  fonctionsByCdc!: Fonction[];
  fonctionsByCdc1: any;
  allfonctions: any;
  visible = false;
  fonctionsByCdcId: any;
  visible3 = false;
  dev: any;
  cdc = new CDC;
  allcdc: CDC[] = [];
  statuses!: any[];
  loading=false;
  selectedVersion:any
  checked: boolean = false;
  @Output() CdcEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() fonctionsByCdcChange = new EventEmitter<any[]>();
  majs: any;
  constructor(
    private reversService: ReverseService,
    private siteService: SiteService,
    private cdcService: CDCService,
    private fonctionService: FonctionService,
    private messageService: MessageService,
    private versionService: versionService,

  ) {

  }
  ngOnInit(): void {
    this.getAllCdc()
   
this.getAllVersion();



  }
 

  getAllCdc() {
    this.loading=true;
    this.cdcService.getAllCdc().subscribe(res => {
      this.allcdc = res
      this.loading=false;
      this.allcdc = res.map((cdc: CDC) => {
        // Create a new object with a "signed" property for clarity
        return {
          ...cdc, // Spread operator to copy existing properties
          signed: cdc.signatureOk ? 'Signed' : 'Not Signed'
        };
      });
      console.log("all cdc with signed status:", this.allcdc);
    });
    
  }

  toggleSigned(allcdc: any) {
    allcdc.signatureOk = !allcdc.signatureOk; 
    allcdc.signed = allcdc.signatureOk ? 'Signed' : 'Not Signed';
    
    this.cdcService.updateSignedState(allcdc.signatureOk,allcdc.idCdc).subscribe(res=>{
  console.log('Signed state updated successfully:', res);

}, error => {
    // Handle any errors that occur during the update process
    console.error('Error updating signed state:', error);
    this.loading=false;
});


   
}
 


 
searchCDCByFilters(){
  console.log(this.selectedVersion)
  this.loading=true
  this.cdcService.getCdcByMaj(this.selectedVersion.idMaj).subscribe(res=>{
    this.allcdc=res;
    this.loading=false
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

}
