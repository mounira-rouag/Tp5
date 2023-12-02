import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeActionsComponent } from './liste-actions.component';

describe('ListeActionsComponent', () => {
  let component: ListeActionsComponent;
  let fixture: ComponentFixture<ListeActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeActionsComponent]
    });
    fixture = TestBed.createComponent(ListeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
