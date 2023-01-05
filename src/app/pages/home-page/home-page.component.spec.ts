import { JackpotService } from './../../shared/services/jackpot.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { of } from 'rxjs';

class MockJackpotService {
  get gameState$() {
    return of(1);
  }

  startGame() {}
}

class MockDialogService {
  get dialogState$() {
    return of(1);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: JackpotService, useClass: MockJackpotService },
        { provide: DialogService, useClass: MockDialogService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    // spyOnProperty(MockJP, 'gameState$').and.returnValue(of(1));
    fixture.detectChanges();
  });

  it('start()', () => {
    let js = fixture.debugElement.injector.get(JackpotService);
    spyOn(js, 'startGame');
    component.start();
    expect(js.startGame).toHaveBeenCalled();
  });
});
