
import { Injectable } from '@angular/core';
import { Action } from '../models/Action.model';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
    
  actions: Action[] = [];

  addAction(action: Action): void {
    this.actions.push(action);
  }
  markActionAsSuccessful(action: Action): void {
    // Update the successful status of the action
    action.successful = true;
  }
  removeAction(action:Action): void {
    const index = this.actions.indexOf(action);
    if (index !== -1) {
      this.actions.splice(index, 1);
    }
  }

  getActions(): Action[] {
    return this.actions;
  }
}