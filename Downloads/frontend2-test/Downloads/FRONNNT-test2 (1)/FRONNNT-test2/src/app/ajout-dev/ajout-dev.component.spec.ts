import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDevComponent } from './ajout-dev.component';

describe('AjoutDevComponent', () => {
  let component: AjoutDevComponent;
  let fixture: ComponentFixture<AjoutDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutDevComponent]
    });
    fixture = TestBed.createComponent(AjoutDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
