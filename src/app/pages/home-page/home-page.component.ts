import { JackpotService } from './../../shared/services/jackpot.service';
import { GAME_STATE } from './../../shared/interfaces/jackpot-interfaces';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private jp: JackpotService) { }
  subs$ = new Subscription();
  gameState: GAME_STATE;

  ngOnInit(): void {

    this.subs$.add(this.jp.gameState$.asObservable().subscribe((state) => {
      this.gameState = state;
    }))
  }

}
