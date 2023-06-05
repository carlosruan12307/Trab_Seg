import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginComponent } from './form-login.component';

describe('LoginPageComponent', () => {
  let component: FormLoginComponent ;
  let fixture: ComponentFixture<FormLoginComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLoginComponent ]
    });
    fixture = TestBed.createComponent(FormLoginComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});