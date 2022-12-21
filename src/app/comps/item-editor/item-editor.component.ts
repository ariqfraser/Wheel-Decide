import { LobbyItem } from './../../shared/interfaces/jackpot-interfaces';
import { JackpotService } from './../../shared/services/jackpot.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements AfterViewInit {

  constructor(private jp: JackpotService) { }

  @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

  items: LobbyItem[];

  ngAfterViewInit() {

  }

  onChange() {
    const itemsString = this.textarea.nativeElement.value;
    const itemsArray = itemsString.split('\n')
    // this.wheelService.updateItemsSimple(itemsArray)
    this.jp.updateLobby(itemsArray);
  }
}
