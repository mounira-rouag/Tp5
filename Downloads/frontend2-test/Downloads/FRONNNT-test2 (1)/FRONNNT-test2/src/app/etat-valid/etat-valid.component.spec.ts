import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatValidComponent } from './etat-valid.component';

describe('EtatValidComponent', () => {
  let component: EtatValidComponent;
  let fixture: ComponentFixture<EtatValidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatValidComponent]
    });
    fixture = TestBed.createComponent(EtatValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
