import { Subscription } from 'rxjs';
import { LobbyItem } from './../../shared/interfaces/jackpot-interfaces';
import { JackpotService } from './../../shared/services/jackpot.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-jackpot-lobby',
  templateUrl: './jackpot-lobby.component.html',
  styleUrls: ['./jackpot-lobby.component.scss']
})
export class JackpotLobbyComponent implements OnInit, OnDestroy {

  constructor(private jp: JackpotService) { }

  lobbyItems: LobbyItem[];

  subs$ = new Subscription();

  ngOnInit(): void {
    this.subs$.add(this.jp.lobby$.asObservable().subscribe((value) => {
      this.lobbyItems = value
    }))
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  startGame() {
    this.jp.startGame()
  }

}
