import { Injectable } from '@angular/core';

import { FieldSize } from './field-size';
import { DifficultyLevel } from './difficulty-level';
import { Tile } from './tile';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  fieldSize: FieldSize;
  difficultyLevel: DifficultyLevel;
  startScreenViewed = false;
  ready = false;
  over = false;

  private field: Tile[][] = [];
  private mineTiles: Tile[] = [];

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
    // Placing mines
    const totalTiles = this.fieldSize.getHeight() * this.fieldSize.getWidth();
    let minePlacings =  totalTiles * (this.difficultyLevel.getMineRatio() / 100);
    for (let i = 0; i < minePlacings; i++) {
      const xRand = this.randomInt(this.fieldSize.getWidth() - 1);
      const yRand = this.randomInt(this.fieldSize.getHeight() - 1);
      const tile = this.getTile(xRand, yRand);
      if (tile.mined) {
        // Already mined, adding a placing operation
        minePlacings++;
      } else {
        tile.mined = true;
        this.mineTiles.push(tile);
      }
    }
    this.ready = true;
    this.over = false;
  }

  private randomInt(max: number): number {
    return Math.round(Math.random() * max);
  }

  getTile(xPos: number, yPos: number): Tile {
    return this.field[yPos][xPos];
  }

  uncover(tile: Tile) {
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) {
      alert('Remove flag before uncovering.');
      return;
    }

    if (tile.mined) {
      this.mineTiles.map(t => this.uncoverMine(t));
      this.over = true;
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
  }

  flag(tile: Tile) {
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) {
      tile.flagged = false;
      tile.text = '';
    } else {
      tile.flagged = true;
      tile.text = '⚑';
    }
  }
}
