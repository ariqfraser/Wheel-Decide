import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotLobbyComponent } from './jackpot-lobby.component';

describe('JackpotLobbyComponent', () => {
  let component: JackpotLobbyComponent;
  let fixture: ComponentFixture<JackpotLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JackpotLobbyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
