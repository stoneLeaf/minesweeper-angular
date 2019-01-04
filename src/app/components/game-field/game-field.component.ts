import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
  currentGame: Game;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.currentGame().subscribe(game => this.currentGame = game);
  }

  private coordinatesArray(length: number): number[] {
    return Array.from(Array(length).keys());
  }

  heightArray(): number[] {
    return this.coordinatesArray(this.currentGame.height);
  }

  widthArray(): number[] {
    return this.coordinatesArray(this.currentGame.width);
  }
}
