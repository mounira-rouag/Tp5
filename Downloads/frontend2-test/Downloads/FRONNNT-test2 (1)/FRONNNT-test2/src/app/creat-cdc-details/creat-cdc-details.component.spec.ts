import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCdcDetailsComponent } from './creat-cdc-details.component';

describe('CreatCdcDetailsComponent', () => {
  let component: CreatCdcDetailsComponent;
  let fixture: ComponentFixture<CreatCdcDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatCdcDetailsComponent]
    });
    fixture = TestBed.createComponent(CreatCdcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
