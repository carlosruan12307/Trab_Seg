import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTokenComponent } from './card-token.component';

describe('CardTokenComponent', () => {
  let component: CardTokenComponent;
  let fixture: ComponentFixture<CardTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTokenComponent]
    });
    fixture = TestBed.createComponent(CardTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
