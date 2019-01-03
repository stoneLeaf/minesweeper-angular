import { BehaviorSubject, Subject } from 'rxjs';

import { Tile } from './tile.model';

/**
 * Class representing a game.
 */
export class Game {
  private field: Tile[][] = [];
  private mineTiles: Tile[] = [];
  private leftToUncover: number;

  started = false;
  over = false;

  remainingMines: number;

  startDate: Date;
  timerInterval;
  secondsElapsed = 0;

  gameStatus$ = new BehaviorSubject<string>('running');
  uncoverings$ = new Subject();

  constructor(private height: number,
              private width: number,
              private totalMines: number) {
    this.generateField();
  }

  getHeight(): number {
    return this.height;
  }

  getWidth(): number {
    return this.width;
  }

  getTotalMines(): number {
    return this.totalMines;
  }

  generateField() {
    // Generating tiles
    for (let y = 0; y < this.getHeight(); y++) {
      this.field[y] = [];
      for (let x = 0; x < this.getWidth(); x++) {
        this.field[y][x] = new Tile(this, x, y);
      }
    }
    const totalTiles = this.getHeight() * this.getWidth();
    this.remainingMines = this.totalMines;
    this.leftToUncover = totalTiles - this.remainingMines;
  }

  placeMinesAwayFrom(tile: Tile) {
    let minePlacings = this.remainingMines;
    for (let i = 0; i < minePlacings; i++) {
      const xRand = this.randomInt(this.getWidth() - 1);
      const yRand = this.randomInt(this.getHeight() - 1);
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
      this.secondsElapsed = delta;
    }, 1000);
    this.placeMinesAwayFrom(tile);
  }

  stop() {
    this.over = true;
    clearInterval(this.timerInterval);
  }


  uncover(tile: Tile) {
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) { return; }
    this.uncoverings$.next();
    if (!this.started) { this.start(tile); }

    if (tile.mined) {
      // Lost
      this.gameStatus$.next('lost');
      tile.clickedMine = true;
      this.mineTiles.map(t => t.uncovered = true);
      this.stop();
      return;
    }

    this.checkAround(tile);
  }

  private checkAround(tile: Tile) {
    if (tile.uncovered || tile.flagged) {
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
        if (x < 0 || x >= this.getWidth()) { continue; }
        const y = tile.yPos + dY;
        if (y < 0 || y >= this.getHeight()) { continue; }
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
      tile.number = number;
    }

    if (this.leftToUncover === 0) {
      // Won
      this.gameStatus$.next('won');
      this.mineTiles.map(t => t.flagged = true);
      this.remainingMines = 0;
      alert(`You won in ${this.secondsElapsed}!`);
      this.stop();
    }
  }

  toggle(tile: Tile) {
    if (this.over) { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) {
      this.remainingMines++;
      tile.flagged = false;
    } else {
      this.remainingMines--;
      tile.flagged = true;
    }
  }
}
