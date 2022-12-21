import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './comps/box/box.component';
import { FireworksComponent } from './comps/fireworks/fireworks.component';



@NgModule({
  declarations: [
    BoxComponent,
    FireworksComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoxComponent,
    FireworksComponent
  ]
})
export class SharedModule { }
