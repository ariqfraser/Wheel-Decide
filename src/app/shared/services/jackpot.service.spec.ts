import { Observable, of } from 'rxjs';
import { LobbyItem, GAME_STATE } from './../interfaces/jackpot-interfaces';
import { TestBed } from '@angular/core/testing';

import { JackpotService } from './jackpot.service';

describe('JackpotService', () => {
  let service: JackpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JackpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('NORMAL: updateLobby()', () => {
    let lobbyItem: LobbyItem[] = [];
    service.updateLobby(['op 1', 'op 2', 'op 3']);
    service.lobby$.subscribe((lobby) => {
      lobbyItem = lobby;
    });
    expect(lobbyItem.length).toBe(3);
  });

  it('EXCEPTIONAL: updateLobby()', () => {
    let lobbyItem: LobbyItem[] = [];
    service.updateLobby([]);
    service.lobby$.subscribe((lobby) => {
      lobbyItem = lobby;
    });
    expect(lobbyItem.length).toBe(0);
  });

  it('updateGameState()', () => {
    let gameState: number = GAME_STATE.LOADING;
    service.gameState$.subscribe((state) => {
      gameState = state;
    });
    service.updateGameState(GAME_STATE.END);

    expect<number>(gameState).toBe(GAME_STATE.END);

    service.updateGameState(12);
    expect<number>(gameState).toBe(12);
  });

  it('should return gameItems$', () => {
    expect(service.gameItems$ instanceof Observable).toEqual(
      of([]) instanceof Observable
    );
  });

  describe('startGame()', () => {
    it('should do nothing if itemmCount is 0', () => {
      spyOn<any>(service, 'initialiseGameItems');
      spyOn(window, 'alert');
      service.updateLobby([]);
      service.startGame();
      expect(service['initialiseGameItems']).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('no items');
    });

    it('should call selectWinner', () => {
      spyOn<any>(service, 'selectWinner');
      service.updateLobby(['a']);
      service.startGame();
      expect(service['selectWinner']).toHaveBeenCalled();
    });
    it('should call selectWinner 1', () => {
      spyOn<any>(service, 'selectWinner');
      service.updateLobby(['a', '3', '3', '3', '3', '3', '3']);
      service.startGame();
      expect(service['selectWinner']).toHaveBeenCalled();
    });
  });
});
