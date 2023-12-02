import { Membre } from "./Member.model";

export class Action {
    name: string;
    goal: string;
    responsible: Membre;
    peopleAffected: number;
    dateCreated: Date;
    successful: boolean;
  
    constructor(
      name: string,
      goal: string,
      responsible: Membre,
      peopleAffected: number,
      dateCreated: Date,
      successful: boolean
    ) {
      this.name = name;
      this.goal = goal;
      this.responsible = responsible;
      this.peopleAffected = peopleAffected;
      this.dateCreated = dateCreated;
      this.successful = successful;
    }
  }