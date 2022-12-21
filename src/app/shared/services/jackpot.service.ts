import { BehaviorSubject } from 'rxjs';
import { LobbyItem, GAME_STATE, JP_DEFAULT } from './../interfaces/jackpot-interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JackpotService {

  private _lobbyItems: LobbyItem[] = [];
  private _gameItems: LobbyItem[] = [];
  gameItems$: BehaviorSubject<LobbyItem[]> = new BehaviorSubject(this._gameItems);
  lobby$: BehaviorSubject<LobbyItem[]> = new BehaviorSubject(this._lobbyItems);
  gameState$: BehaviorSubject<number> = new BehaviorSubject(GAME_STATE.LOBBY);


  constructor() { }

  updateLobby(items: string[]) {

    this._lobbyItems = items.map(item => ({
      name: item,
      weighting: 1,
      // colour: `rgb(${randVal()},${randVal()},${randVal()})`
      colour: `hsl(${this.randVal(300)}, ${this.randVal(100, 50)}%, ${this.randVal(100, 60)}%`
    }))
    this.lobby$.next(this._lobbyItems)
  }

  startGame() {
    const itemCount = this._lobbyItems.length;

    if (itemCount === 0) {
      alert("no items")
      return;
    }

    this.gameState$.next(GAME_STATE.LOADING)
    this.initialiseGameItems();
    this.selectWinner();
    this.gameState$.next(GAME_STATE.PLAYING)
  }

  private initialiseGameItems() {
    const itemCount = this._lobbyItems.length;

    if (itemCount === 0) {
      alert("no items")
      return;
    }

    const factor = Math.floor(JP_DEFAULT.SPINNER_ITEMS / itemCount)

    let gameItems: LobbyItem[] = [];
    const shuffleArr = (arr: LobbyItem[]) => {
      return arr.sort(() => Math.random() - 0.5);
    }
    for (let i = 0; i < factor; i++) {
      gameItems = gameItems.concat(shuffleArr(this._lobbyItems))
    }

    const remainder = JP_DEFAULT.SPINNER_ITEMS - gameItems.length;
    if (remainder > 0) {
      for (let i = 0; i < remainder; i++) {
        gameItems = gameItems.concat(this._lobbyItems[this.randVal(this._lobbyItems.length - 1)])
      }

    }
    this.updateGameItems(gameItems);
  }

  private selectWinner() {
    const itemCount = this._gameItems.length;
    console.log("game length", itemCount);
    const winner = this._gameItems[Math.floor(Math.random() * itemCount + 1)]
    this.setWinner(winner);
    console.log("winner", { winner });
    console.log(this._gameItems);

  }

  private setWinner(winner: LobbyItem) {
    this._gameItems.splice(JP_DEFAULT.SPINNER_ITEMS - 10, 1, winner)
    this.updateGameItems();
  }

  private updateGameItems(newItems?: LobbyItem[]) {
    if (newItems) {
      this._gameItems = newItems;
    }
    this.gameItems$.next(this._gameItems);
  }

  private randVal(max: number, min?: number) {
    const MIN = min ? min : 1;
    return Math.floor(Math.random() * (max - MIN) + MIN);
  }
}
