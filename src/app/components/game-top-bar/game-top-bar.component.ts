import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-top-bar',
  templateUrl: './game-top-bar.component.html',
  styleUrls: ['./game-top-bar.component.scss']
})
export class GameTopBarComponent implements OnInit {
  gameStatus: string;
  uncovering = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.subscribeToCurrentGame();
  }

  subscribeToCurrentGame() {
    this.gameService.getCurrentGame().gameStatus$.subscribe((status) => {
      this.gameStatus = status;
    });
    this.gameService.getCurrentGame().uncoverings$.subscribe(() => {
      if (!this.uncovering) {
        this.uncovering = true;
        setInterval(() => {
          this.uncovering = false;
        }, 250);
      }
    });
  }

  newGame() {
    this.gameService.newGame();
    this.subscribeToCurrentGame();
  }

  minesDigits(): string[] {
    return this.digitsArray(this.gameService.getCurrentGame().remainingMines, 3);
  }

  timerDigits(): string[] {
    return this.digitsArray(this.gameService.getCurrentGame().secondsElapsed, 3);
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
  private digitsArray(value: number, length: number): string[] {
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
    return (prefix + output).split('');
  }
}
