import { Component, Input } from '@angular/core';
import { Action } from '../models/Action.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActionService } from '../services/action.service';
import { NgForm } from '@angular/forms';
import { Membre } from '../models/Member.model';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  @Input() action !: Action ;
  

  constructor(private actionService: ActionService) {}

  markAsSuccessful(): void {
    // Implement the logic to mark the action as successful
    this.actionService.markActionAsSuccessful(this.action);
  }

  deleteAction(): void {
    this.actionService.removeAction(this.action)
    // Implement the logic to delete the action if needed
    // You might want to emit an event to inform the parent component about the deletion
  }
}
