import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() { }

  private coordinatesArray(length: number): number[] {
    return Array.from(Array(length).keys());
  }

  getGame(): Game {
    return this.gameService.getCurrentGame();
  }

  heightArray(): number[] {
    return this.coordinatesArray(this.getGame().getHeight());
  }

  widthArray(): number[] {
    return this.coordinatesArray(this.getGame().getWidth());
  }
}
