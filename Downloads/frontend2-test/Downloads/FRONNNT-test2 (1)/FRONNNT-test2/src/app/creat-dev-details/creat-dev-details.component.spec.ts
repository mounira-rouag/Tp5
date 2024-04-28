import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatDevDetailsComponent } from './creat-dev-details.component';

describe('CreatDevDetailsComponent', () => {
  let component: CreatDevDetailsComponent;
  let fixture: ComponentFixture<CreatDevDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatDevDetailsComponent]
    });
    fixture = TestBed.createComponent(CreatDevDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
