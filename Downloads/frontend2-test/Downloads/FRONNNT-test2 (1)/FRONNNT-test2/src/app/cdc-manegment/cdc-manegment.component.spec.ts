import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdcManegmentComponent } from './cdc-manegment.component';

describe('CdcManegmentComponent', () => {
  let component: CdcManegmentComponent;
  let fixture: ComponentFixture<CdcManegmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdcManegmentComponent]
    });
    fixture = TestBed.createComponent(CdcManegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
