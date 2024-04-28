import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatVehiculesDetailsComponent } from './creat-vehicules-details.component';

describe('CreatVehiculesDetailsComponent', () => {
  let component: CreatVehiculesDetailsComponent;
  let fixture: ComponentFixture<CreatVehiculesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatVehiculesDetailsComponent]
    });
    fixture = TestBed.createComponent(CreatVehiculesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
