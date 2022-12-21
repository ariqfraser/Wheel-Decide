import { JP_DEFAULT } from './../../interfaces/jackpot-interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  constructor() { }

  size: number = JP_DEFAULT.BOX_SIZE;
  margin: number = JP_DEFAULT.BOX_MARGIN;
  @Input() colour?: string;
  @Input() name?: string;

  ngOnInit(): void {
  }

}
