import { Component, Input } from '@angular/core';
import { Action } from '../models/Action.model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActionService } from '../services/action.service';
@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.scss']
})
export class NewActionComponent {
  @Input() action !: Action ;
  addActionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private actionService: ActionService) {}

  ngOnInit(): void {
    this.addActionForm = this.formBuilder.group({
      name: [null],
      goal: [null],
      responsible: [null],
      peopleAffected: [null],
      dateCreated:[null]
    });
  }

  onSubmitForm(): void {
    // You can add logic here to handle the form submission
    // For example, add the action to your service
    const newAction = this.addActionForm.value;
    this.actionService.addAction(newAction);

    
      
  }

}
