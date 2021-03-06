import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FieldSize } from '../models/field-size.model';
import { DifficultyLevel } from '../models/difficulty-level.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private fieldSize: FieldSize;
  private difficultyLevel: DifficultyLevel;

  private _currentGame$: BehaviorSubject<Game>;

  constructor() {
    // Setting default values
    this.fieldSize = FieldSize.Medium;
    this.difficultyLevel = DifficultyLevel.Intermediate;
    this._currentGame$ = new BehaviorSubject<Game>(this.createNewGame());
  }

  private createNewGame(): Game {
    const totalTiles = this.fieldSize.getHeight() * this.fieldSize.getWidth();
    const totalMines = Math.round(totalTiles * (this.difficultyLevel.getMineRatio() / 100));
    return new Game(this.fieldSize.getHeight(),
                    this.fieldSize.getWidth(),
                    totalMines);
  }

  newGame() {
    this._currentGame$.next(this.createNewGame());
  }

  get currentGame$(): Observable<Game> {
    return this._currentGame$.asObservable();
  }

  setFieldSize(fieldSize: FieldSize) {
    this.fieldSize = fieldSize;
  }

  setDifficultyLevel(difficultyLevel: DifficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }
}
