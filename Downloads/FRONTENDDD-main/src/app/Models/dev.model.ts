import { Maj } from "./Maj.model";
import { User } from "./User.model";
import { Vehicule } from "./Vehicule.model";
import { CDC } from "./cdc.model";
import { Ecu } from "./ecu.model";
import { EtatDev } from "./etatDev.model";

export interface Dev {
  devs: any;
    marqueId: number;
    id: number;
    devname: string;
    dll: string;
    devDuplique: boolean;
    devComment: string;
    numBug: string;
    responsible:String;
    family:String;
    ecuName:String;
    etatdev:EtatDev;
    cdc :CDC;
    ecu:Ecu;
    user:User;
    
    vehicules:Vehicule[];
     maj:Maj;
  }
  