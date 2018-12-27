import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameTileComponent } from './components/game-tile/game-tile.component';
import { GameTopBarComponent } from './components/game-top-bar/game-top-bar.component';
import { MainComponent } from './components/main/main.component';
import { OptionsComponent } from './components/options/options.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    GameComponent,
    GameFieldComponent,
    GameTileComponent,
    GameTopBarComponent,
    MainComponent,
    OptionsComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
