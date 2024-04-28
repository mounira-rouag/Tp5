import { DevService } from "../Services/dev-service.service";
import { Dev } from "./dev.model";

export interface Fonction {
    IdFonction: number;
    nomFonction: string;
    Ordre: number;
    CodeDico: number;
    descrAnglais: string;
    devs:Dev[];
  }