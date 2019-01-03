import { Injectable } from '@angular/core';

import { FieldSize } from '../models/field-size.model';
import { DifficultyLevel } from '../models/difficulty-level.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private fieldSize: FieldSize;
  private difficultyLevel: DifficultyLevel;

  private currentGame: Game;

  constructor() {
    // Setting default values
    this.fieldSize = FieldSize.Medium;
    this.difficultyLevel = DifficultyLevel.Intermediate;
  }

  newGame() {
    const totalTiles = this.fieldSize.getHeight() * this.fieldSize.getWidth();
    const totalMines = Math.round(totalTiles * (this.difficultyLevel.getMineRatio() / 100));
    this.currentGame = new Game(this.fieldSize.getHeight(),
                                this.fieldSize.getWidth(),
                                totalMines);
  }

  getCurrentGame(): Game {
    return this.currentGame;
  }

  setFieldSize(fieldSize: FieldSize) {
    this.fieldSize = fieldSize;
  }

  setDifficultyLevel(difficultyLevel: DifficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }
}
