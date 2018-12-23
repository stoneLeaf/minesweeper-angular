import { Injectable } from '@angular/core';

import { BoardSize } from './board-size';
import { DifficultyLevel } from './difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  boardSize: BoardSize;
  difficultyLevel: DifficultyLevel;

  constructor() {
    // Setting default values
    this.boardSize = BoardSize.Medium;
    this.difficultyLevel = DifficultyLevel.Beginner;
  }

  setBoardSize(boardSize: BoardSize) {
    this.boardSize = boardSize;
  }

  setDifficultyLevel(difficultyLevel: DifficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }
}
