import { DialogService } from './../../shared/services/dialog.service';
import { Subscription, timer } from 'rxjs';
import { LobbyItem, GAME_STATE, JP_DEFAULT } from './../../shared/interfaces/jackpot-interfaces';
import { JackpotService } from './../../shared/services/jackpot.service';
import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jackpot-wheel',
  templateUrl: './jackpot-wheel.component.html',
  styleUrls: ['./jackpot-wheel.component.scss']
})
export class JackpotWheelComponent implements OnInit, OnDestroy {

  constructor(private jp: JackpotService, private ds: DialogService) { }

  items: LobbyItem[];
  gameState: GAME_STATE;
  subs$ = new Subscription();
  start: boolean = false;

  @ViewChild('itemWrapper') wheel: ElementRef<HTMLDivElement>

  ngOnInit(): void {


    this.subs$.add(this.jp.gameItems$.subscribe((items) => {
      this.items = items.concat(items);
    }))

    this.subs$.add(this.jp.gameState$.subscribe((state) => {
      if (state === GAME_STATE.PLAYING) {
        this.start = false;
        setTimeout(() => {
          this.start = true;
          this.startAnimation();
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

  private startAnimation() {
    const wheel = this.wheel.nativeElement;
    const middleBoxOffset = 600;
    const randomOffset = Math.floor(Math.random() * 99)
    const winnerPos = (JP_DEFAULT.BOX_SIZE * JP_DEFAULT.SPINNER_ITEMS - 1000) - middleBoxOffset + randomOffset;

    // reset wheel
    wheel.style.transitionDelay = "0s";
    wheel.style.transition = "transform 0s"
    wheel.style.transform = `translateX(0)`

    timer(1000).subscribe(() => {
      // wheel.style.transitionDelay = "1000ms";
      wheel.style.transition = "transform 20s"

      wheel.style.transform = `translateX(-${winnerPos}px)`

    })
  }

  gameOver() {
    this.ds.open(this.items[140].name + " is the winner!")
    this.jp.updateGameState(GAME_STATE.END)
  }

}
