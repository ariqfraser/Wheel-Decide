import { Subscription } from 'rxjs';
import { LobbyItem, GAME_STATE, JP_DEFAULT } from './../../shared/interfaces/jackpot-interfaces';
import { JackpotService } from './../../shared/services/jackpot.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-jackpot-wheel',
  templateUrl: './jackpot-wheel.component.html',
  styleUrls: ['./jackpot-wheel.component.scss']
})
export class JackpotWheelComponent implements OnInit, OnDestroy {

  constructor(private jp: JackpotService) { }

  items: LobbyItem[];
  gameState: GAME_STATE;
  subs$ = new Subscription();
  start: boolean = false;

  ngOnInit(): void {
    this.subs$.add(this.jp.gameItems$.asObservable().subscribe((items) => {
      this.items = items.concat(items);
    }))

    this.subs$.add(this.jp.gameState$.asObservable().subscribe((state) => {
      if (state === GAME_STATE.PLAYING) {
        this.start = false;
        setTimeout(() => {
          this.start = true;
        }, 0)
        setTimeout(() => {
          this.gameOver()
        }, 21500);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  gameOver() {
    alert(this.items[140].name);
    this.jp.gameState$.next(GAME_STATE.END)
  }

}
