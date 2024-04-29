import { EtatDev } from "./etatDev.model";
import { Validation } from "./validation.model";


export class Dev {
  devs: any;

  id: any;
  devname: any;
  dll: any;
  devDuplique: any;
  devComment: any;
  numBug: any;
  responsible: any;
  family: any;
  ecuName: any;
  etatdev: EtatDev | undefined;
  Jira: any;
  grpmarque: any;
  cdc: any;
  bug: any;
  ecu: any;
  user: any;
  fonctions: any
  validations: Validation[]=[];
  vehicules: any;
  maj: any;
  menu: any;
  cables: any;
  sites:any
}
