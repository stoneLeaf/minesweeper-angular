import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { GameTopBarComponent } from './game-top-bar/game-top-bar.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameTileComponent } from './game-tile/game-tile.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameScreenComponent,
    GameTopBarComponent,
    GameFieldComponent,
    GameTileComponent,
    GlobalFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
