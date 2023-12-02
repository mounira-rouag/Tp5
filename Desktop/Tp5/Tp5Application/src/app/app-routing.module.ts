import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeActionsComponent } from './liste-actions/liste-actions.component';
import { ActionComponent } from './action/action.component';
import { MembreComponent } from './membre/membre.component';
import { NewActionComponent } from './new-action/new-action.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: 'events',             component: ListeActionsComponent},
  {path: 'newaction',             component: ActionComponent },
  {path: 'membre',             component: MembreComponent },
  {path: 'addAction',             component: NewActionComponent },
  {path: '',             component: LandingPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
