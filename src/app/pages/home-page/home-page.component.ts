import { IDialogPayload } from './../../shared/interfaces/dialog.interface';
import { DialogService } from './../../shared/services/dialog.service';
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

  constructor(private jp: JackpotService, private ds: DialogService) { }
  subs$ = new Subscription();
  gameState: GAME_STATE;
  dialogPayload: IDialogPayload = { message: '', state: false };

  ngOnInit(): void {

    this.subs$.add(this.jp.gameState$.subscribe((state) => {
      this.gameState = state;
    }))

    this.subs$.add(this.ds.dialogState$.subscribe((payload) => {
      this.dialogPayload = payload
    }))
  }

}
