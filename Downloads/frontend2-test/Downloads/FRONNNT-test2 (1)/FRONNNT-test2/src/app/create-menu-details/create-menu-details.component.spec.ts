import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuDetailsComponent } from './create-menu-details.component';

describe('CreateMenuDetailsComponent', () => {
  let component: CreateMenuDetailsComponent;
  let fixture: ComponentFixture<CreateMenuDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMenuDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateMenuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
