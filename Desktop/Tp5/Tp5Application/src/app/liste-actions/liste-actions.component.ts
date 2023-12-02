import { Component } from '@angular/core';
import { Action } from '../models/Action.model';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-liste-actions',
  templateUrl: './liste-actions.component.html',
  styleUrls: ['./liste-actions.component.scss']
})
export class ListeActionsComponent {

  actions: Action[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    // Assuming your service has a method to get the list of actions
    this.actions = this.actionService.getActions();
  }

}
