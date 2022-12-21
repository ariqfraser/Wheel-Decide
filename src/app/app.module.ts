import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ItemEditorComponent } from './comps/item-editor/item-editor.component';
import { JackpotWheelComponent } from './comps/jackpot-wheel/jackpot-wheel.component';
import { JackpotLobbyComponent } from './comps/jackpot-lobby/jackpot-lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ItemEditorComponent,
    JackpotWheelComponent,
    JackpotLobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
