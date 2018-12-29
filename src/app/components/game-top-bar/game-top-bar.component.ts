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

  /**
   * Format number for displaying in the top bar counter & timer:
   * - cap value to max value for length
   * - add leading zeroes
   * - put the minus sign in front
   *
   * @param value number to be formatted
   * @param length output length
   */
  formatForDisplay(value: number, length: number): string {
    let prefix = '';
    if (value < 0) {
      length--;
      prefix = '-';
      value = Math.abs(value);
    }
    const max = Math.pow(10, length) - 1;
    if (value > max) {
      value = max;
    }
    let output = '' + value;
    while (output.length < length) {
      output = '0' + output;
    }
    return prefix + output;
  }
}
