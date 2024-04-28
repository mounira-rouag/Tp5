import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateDevComponent } from './duplicate-dev.component';

describe('DuplicateDevComponent', () => {
  let component: DuplicateDevComponent;
  let fixture: ComponentFixture<DuplicateDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateDevComponent]
    });
    fixture = TestBed.createComponent(DuplicateDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
