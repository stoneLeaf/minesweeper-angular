import { Component } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-top-bar',
  templateUrl: './game-top-bar.component.html',
  styleUrls: ['./game-top-bar.component.scss']
})
export class GameTopBarComponent {

  constructor(private gameService: GameService) { }

  newGame() {
    this.gameService.newGame();
  }

  numberForDisplay(value: number, length: number): string {
    const minus = (value < 0) ? '-' : '';
    let output = '' + Math.abs(value);
    while ((minus + output).length < length) {
      output = '0' + output;
    }
    return minus + output;
  }
}
