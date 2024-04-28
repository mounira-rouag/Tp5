import { Dev } from "./dev.model";

export class ValidationModal {
  idValid!: number;
  typeValid!: string;
  dateValid!: Date;
  etatValid!: string;
  idVer!: number;
  versionName!: string;
  devs!: Dev[];
  name!: string;
}