import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotWheelComponent } from './jackpot-wheel.component';

describe('JackpotWheelComponent', () => {
  let component: JackpotWheelComponent;
  let fixture: ComponentFixture<JackpotWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JackpotWheelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
