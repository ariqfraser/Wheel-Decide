import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotLobbyComponent } from './jackpot-lobby.component';

describe('JackpotLobbyComponent', () => {
  let component: JackpotLobbyComponent;
  let fixture: ComponentFixture<JackpotLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackpotLobbyComponent ]
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
