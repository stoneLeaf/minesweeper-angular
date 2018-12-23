import { Injectable } from '@angular/core';

import { FieldSize } from './field-size';
import { DifficultyLevel } from './difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  fieldSize: FieldSize;
  difficultyLevel: DifficultyLevel;

  constructor() {
    // Setting default values
    this.fieldSize = FieldSize.Medium;
    this.difficultyLevel = DifficultyLevel.Beginner;
  }

  setFieldSize(fieldSize: FieldSize) {
    this.fieldSize = fieldSize;
  }

  setDifficultyLevel(difficultyLevel: DifficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }
}
