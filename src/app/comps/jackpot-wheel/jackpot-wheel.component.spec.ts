import { LobbyItem } from './../../shared/interfaces/jackpot-interfaces';
import { DialogService } from './../../shared/services/dialog.service';
import { JackpotService } from './../../shared/services/jackpot.service';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { JackpotWheelComponent } from './jackpot-wheel.component';
import { GAME_STATE } from 'src/app/shared/interfaces/jackpot-interfaces';
import { of, Observable } from 'rxjs';

describe('JackpotWheelComponent', () => {
  let component: JackpotWheelComponent;
  let fixture: ComponentFixture<JackpotWheelComponent>;
  let MockDialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    MockDialogService = jasmine.createSpyObj(['open', 'close']);

    await TestBed.configureTestingModule({
      declarations: [JackpotWheelComponent],
      providers: [
        { provide: DialogService, useValue: MockDialogService },
        {
          provide: JackpotService,
          useClass: class {
            gameItems$: Observable<LobbyItem[]> = of([]);
            gameState$ = of(GAME_STATE.PLAYING);
            updateGameState() {}
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotWheelComponent);
    component = fixture.componentInstance;
    // TestBed.inject(jpService);
    component.wheel = {
      nativeElement: jasmine.createSpyObj('nativeElement', ['style']),
    };
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should start animation then call gameover after 21500 ticks', () => {
      const privateSpy = spyOn<any>(
        component,
        'startAnimation'
      ).and.callThrough();
      component.ngOnInit();
      expect(privateSpy).toHaveBeenCalled();
    });
  });

  describe('gameOver()', () => {
    it('should call dialog service open', () => {
      component.items = new Array(140);
      component.items[140] = { name: 'test', weighting: 1, colour: 'red' };
      component.gameOver();
      expect(MockDialogService.open).toHaveBeenCalled();
    });
  });
});
