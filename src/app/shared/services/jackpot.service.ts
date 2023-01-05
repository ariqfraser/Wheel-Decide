import { BehaviorSubject, Observable } from 'rxjs';
import {
  LobbyItem,
  GAME_STATE,
  JP_DEFAULT,
} from './../interfaces/jackpot-interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JackpotService {
  private _lobbyItems: LobbyItem[] = [];
  private _gameItems: LobbyItem[] = [];
  private _gameItems$: BehaviorSubject<LobbyItem[]> = new BehaviorSubject(
    this._gameItems
  );
  private _lobby$: BehaviorSubject<LobbyItem[]> = new BehaviorSubject(
    this._lobbyItems
  );
  private _gameState$: BehaviorSubject<number> = new BehaviorSubject(
    GAME_STATE.LOBBY
  );

  constructor() {}

  get gameItems$(): Observable<LobbyItem[]> {
    return this._gameItems$.asObservable();
  }
  get lobby$(): Observable<LobbyItem[]> {
    return this._lobby$.asObservable();
  }
  get gameState$(): Observable<number> {
    return this._gameState$.asObservable();
  }

  updateGameState(state: GAME_STATE): void {
    this._gameState$.next(state);
  }

  updateLobby(items: string[]) {
    this._lobbyItems = items.map((item) => ({
      name: item,
      weighting: 1,
      // colour: `rgb(${randVal()},${randVal()},${randVal()})`
      colour: `hsl(${this.randVal(300)}, 75%, 75%`,
    }));
    this._lobby$.next(this._lobbyItems);
  }

  startGame() {
    const itemCount = this._lobbyItems.length;

    if (itemCount === 0) {
      alert('no items');
      return;
    }

    this._gameState$.next(GAME_STATE.LOADING);
    this.initialiseGameItems();
    this.selectWinner();
    this._gameState$.next(GAME_STATE.PLAYING);
  }

  private initialiseGameItems() {
    const itemCount = this._lobbyItems.length;

    if (itemCount === 0) {
      alert('no items');
      return;
    }

    const factor = Math.floor(JP_DEFAULT.SPINNER_ITEMS / itemCount);

    let gameItems: LobbyItem[] = [];
    const shuffleArr = (arr: LobbyItem[]) => {
      return arr.sort(() => Math.random() - 0.5);
    };
    for (let i = 0; i < factor; i++) {
      gameItems = gameItems.concat(shuffleArr(this._lobbyItems));
    }

    const remainder = JP_DEFAULT.SPINNER_ITEMS - gameItems.length;
    if (remainder > 0) {
      for (let i = 0; i < remainder; i++) {
        gameItems = gameItems.concat(
          this._lobbyItems[this.randVal(this._lobbyItems.length - 1)]
        );
      }
    }
    this.updateGameItems(gameItems);
  }

  private selectWinner() {
    const itemCount = this._gameItems.length;
    const winner = this._gameItems[Math.floor(Math.random() * itemCount + 1)];
    this.setWinner(winner);
  }

  private setWinner(winner: LobbyItem) {
    this._gameItems.splice(JP_DEFAULT.SPINNER_ITEMS - 10, 1, winner);
    this.updateGameItems();
  }

  private updateGameItems(newItems?: LobbyItem[]) {
    if (newItems) {
      this._gameItems = newItems;
    }
    this._gameItems$.next(this._gameItems);
  }

  private randVal(max: number, min?: number) {
    const MIN = min ? min : 1;
    return Math.floor(Math.random() * (max - MIN) + MIN);
  }
}
