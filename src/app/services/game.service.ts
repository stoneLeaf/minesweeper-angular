import { Injectable } from '@angular/core';

import { FieldSize } from '../models/field-size.model';
import { DifficultyLevel } from '../models/difficulty-level.model';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  fieldSize: FieldSize;
  difficultyLevel: DifficultyLevel;
  startScreenViewed = false;
  ready = false;
  started = false;
  over = false;
  remainingMines: number;
  startDate: Date;
  timerInterval;
  timerText = '00:00';

  private field: Tile[][] = [];
  private mineTiles: Tile[] = [];
  private leftToUncover: number;

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

  generateField() {
    console.log('Generating field');
    // Generating tiles
    for (let y = 0; y < this.fieldSize.getHeight(); y++) {
      this.field[y] = [];
      for (let x = 0; x < this.fieldSize.getWidth(); x++) {
        this.field[y][x] = new Tile(x, y);
      }
    }
    const totalTiles = this.fieldSize.getHeight() * this.fieldSize.getWidth();
    this.remainingMines =  Math.round(totalTiles * (this.difficultyLevel.getMineRatio() / 100));
    this.leftToUncover = totalTiles - this.remainingMines;
    this.ready = true;
  }

  placeMinesAwayFrom(tile: Tile) {
    let minePlacings = this.remainingMines;
    for (let i = 0; i < minePlacings; i++) {
      const xRand = this.randomInt(this.fieldSize.getWidth() - 1);
      const yRand = this.randomInt(this.fieldSize.getHeight() - 1);
      const randTile = this.getTile(xRand, yRand);
      if (randTile.mined || this.areNear(randTile, tile)) {
        // Adding a new try
        minePlacings++;
      } else {
        randTile.mined = true;
        this.mineTiles.push(randTile);
      }
    }
  }

  private randomInt(max: number): number {
    return Math.round(Math.random() * max);
  }

  private areNear(tileA: Tile, tileB: Tile): boolean {
    const deltaX = tileA.xPos - tileB.xPos;
    const deltaY = tileA.yPos - tileB.yPos;
    if (((deltaX === 0 || Math.abs(deltaX) === 1)) &&
         (deltaY === 0 || Math.abs(deltaY) === 1)) {
      return true;
    }
    return false;
  }

  getTile(xPos: number, yPos: number): Tile {
    return this.field[yPos][xPos];
  }

  start(tile: Tile) {
    this.started = true;
    this.startDate = new Date();
    this.timerInterval = setInterval(() => {
      const delta = Math.floor(
                    ((new Date()).getTime() - this.startDate.getTime()) / 1000);
      this.timerText = this.timerForDisplay(delta);
    }, 1000);
    this.placeMinesAwayFrom(tile);
  }

  private timerForDisplay(totalSeconds: number): string {
    let minutes: any = Math.floor(totalSeconds / 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let seconds: any = Math.floor(totalSeconds % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  stop() {
    this.over = true;
    clearInterval(this.timerInterval);
  }

  newGame() {
    this.stop();
    this.over = false;
    this.started = false;
    this.timerText = '00:00';
    this.generateField();
  }

  uncover(tile: Tile) {
    if (!this.started) { this.start(tile); }
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) { return; }

    if (tile.mined) {
      this.mineTiles.map(t => this.uncoverMine(t));
      this.stop();
      return;
    }

    this.checkAround(tile);
  }

  private uncoverMine(tile: Tile) {
    tile.uncovered = true;
    tile.text = '💣';
  }

  private checkAround(tile: Tile) {
    if (tile.uncovered) {
      return;
    }
    tile.uncovered = true;
    this.leftToUncover--;
    let number = 0;
    const aroundTiles = [];
    for (let dX = -1; dX < 2; dX++) {
      for (let dY = -1; dY < 2; dY++) {
        if (dX === 0 && dY === 0) { continue; }
        const x = tile.xPos + dX;
        if (x < 0 || x >= this.fieldSize.getWidth()) { continue; }
        const y = tile.yPos + dY;
        if (y < 0 || y >= this.fieldSize.getHeight()) { continue; }
        const currentTile = this.getTile(x, y);
        if (currentTile.mined) {
          number++;
        }
        aroundTiles.push(currentTile);
      }
    }

    if (number === 0) {
      aroundTiles.map(t => this.checkAround(t));
    } else {
      tile.text = number.toString();
    }

    if (this.leftToUncover === 0) {
      this.mineTiles.map(t => this.flag(t));
      this.remainingMines = 0;
      alert(`You won in ${this.timerText}!`);
      this.stop();
    }
  }

  toggle(tile: Tile) {
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) {
      this.remainingMines++;
      this.unflag(tile);
    } else {
      this.remainingMines--;
      this.flag(tile);
    }
  }

  private flag(tile: Tile) {
    tile.flagged = true;
    tile.text = '⚑';
  }

  private unflag(tile: Tile) {
    tile.flagged = false;
    tile.text = '';
  }
}
