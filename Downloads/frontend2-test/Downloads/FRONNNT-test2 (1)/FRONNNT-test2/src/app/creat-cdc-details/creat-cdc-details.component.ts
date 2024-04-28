import { Component, EventEmitter, Output } from '@angular/core';
import { ReverseService } from '../Services/reverse-service.service';
import { CDCService } from '../Services/cdc-service.service';
import { Reverse } from '../Models/reverse.model';
import { Site } from '../Models/Sites.model';
import { SiteService } from '../Services/sites-service.service';
import { FonctionService } from '../Services/fonctions-service.service';
import { CDC } from '../Models/cdc.model';
import { Fonction } from '../Models/fonction.model';

@Component({
  selector: 'app-creat-cdc-details',
  templateUrl: './creat-cdc-details.component.html',
  styleUrls: ['./creat-cdc-details.component.css']
})
export class CreatCdcDetailsComponent {
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
  allcdc: CDC[] = []
  @Output() CdcEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() fonctionsByCdcChange = new EventEmitter<any[]>();
  constructor(
    private reversService: ReverseService,
    private siteService: SiteService,
    private cdcService: CDCService,
    private fonctionService: FonctionService,

  ) {

  }
  ngOnInit(): void {

    this.getAllReverse();
    this.getAllSite();

    this.getAllFonctions();
    this.getAllCdc()
    this.emitCdc();




  }
  getSeverity(signatureOk: string) {
    switch (signatureOk) {
        case 'Signed':
            return 'success';
        case 'Not Signed':
            return 'danger';
            default:
              return 'unknown';
    }
}
  emitCdc() {

    this.cdc.fonctions = this.fonctionsByCdc;
    this.CdcEmit.emit(this.cdc);
    console.log("cdc  is ", this.CdcEmit);
  }
  getAllCdc() {
    this.cdcService.getAllCdc().subscribe(res => {
      this.allcdc = res
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
  selectProduct(cdc = new CDC) {
    this.cdc = cdc;
    this.fonctionsByCdc=this.cdc.fonctions
    console.log("----new dev-----", this.cdc)
    this.visibleTable=false;
  }

  showDialogfonction(cdcId: number) {
    this.visible3 = true;
    this.fonctionService.getFonctionByCdc(cdcId).subscribe(res => {
      this.fonctionsByCdcId = res;

      console.log("fonctions", cdcId, this.fonctionsByCdcId)
    })

  }
  showDialog() {
    this.visibleTable = true;
  }

  visibleTable = false
 

  getAllFonctions() {
    this.fonctionService.getAllFonctions().subscribe(res => {
      this.allfonctions = res;
      this.fonctionsByCdc = []
    })
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
  onMoveToSource(event: any) {
    // Handle item moved from target to source list
    const removedItem = event.items;
    // Assuming 'id' is the unique identifier of the item
    const index = this.fonctionsByCdc.findIndex((item: any) => item.id === removedItem.id);
    if (index === -1) {
      this.fonctionsByCdc.push(removedItem);
    }
    console.log(this.fonctionsByCdc);
    this.cdc.fonctions = this.fonctionsByCdc;
    this.fonctionsByCdcChange.emit(this.fonctionsByCdc);
    console.log("this is foctiosnby cdc ", this.fonctionsByCdcChange)
    console.log("this is foctiosnby cdc ", this.cdc.fonctions)
  }

  onMoveToTarget(event: any) {
    // Handle item moved from source to target list
    const addedItem = event.items;
    const index = this.fonctionsByCdc.findIndex((item: any) => item.id === addedItem.id);
    if (index !== -1) {
      this.fonctionsByCdc.splice(index, 1);
    }
    console.log(this.fonctionsByCdc);
    this.cdc.fonctions = this.fonctionsByCdc;
    this.fonctionsByCdcChange.emit(this.fonctionsByCdc);
    console.log("this is foctiosnby cdc ", this.cdc.fonctions)
  }


}
