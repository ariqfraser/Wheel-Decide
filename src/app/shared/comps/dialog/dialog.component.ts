import { timer } from 'rxjs';
import { DialogService } from './../../services/dialog.service';
import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(private ds: DialogService) { }

  @Input() message: string = '';
  visible: boolean = true;

  close() {
    this.visible = false;
    timer(1000).subscribe((_) => {
      this.ds.close()
    })
  }

  overlayClose($event: Event) {
    if ($event.currentTarget === $event.target) {
      this.close()
    }
  }

}
