import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdaptateurDetailsComponent } from './create-adaptateur-details.component';

describe('CreateAdaptateurDetailsComponent', () => {
  let component: CreateAdaptateurDetailsComponent;
  let fixture: ComponentFixture<CreateAdaptateurDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdaptateurDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateAdaptateurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
