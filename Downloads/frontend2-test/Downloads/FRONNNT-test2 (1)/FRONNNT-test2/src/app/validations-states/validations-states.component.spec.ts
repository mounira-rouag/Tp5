import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsStatesComponent } from './validations-states.component';

describe('ValidationsStatesComponent', () => {
  let component: ValidationsStatesComponent;
  let fixture: ComponentFixture<ValidationsStatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationsStatesComponent]
    });
    fixture = TestBed.createComponent(ValidationsStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
