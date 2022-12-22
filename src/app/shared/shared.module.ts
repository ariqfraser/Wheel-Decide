import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './comps/box/box.component';
import { FireworksComponent } from './comps/fireworks/fireworks.component';
import { DialogComponent } from './comps/dialog/dialog.component';



@NgModule({
  declarations: [
    BoxComponent,
    FireworksComponent,
    DialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoxComponent,
    FireworksComponent,
    DialogComponent
  ]
})
export class SharedModule { }
