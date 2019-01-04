import { BehaviorSubject, Subject } from 'rxjs';

import { Tile } from './tile.model';

/**
 * Class representing a game.
 */
export class Game {
  private field: Tile[][];
  private mineTiles: Tile[];
  private leftToUncover: number;

  private startDate: Date;
  private timerInterval;

  gameStatus$: BehaviorSubject<string>;
  uncoverings$: Subject<any>;

  remainingMines$: BehaviorSubject<number>;
  secondsElapsed$: BehaviorSubject<number>;

  constructor(private _height: number,
              private _width: number,
              private _totalMines: number) {
    this.generateField();

    this.gameStatus$ = new BehaviorSubject<string>('ready');
    this.uncoverings$ = new Subject();

    this.remainingMines$ = new BehaviorSubject<number>(this.totalMines);
    this.secondsElapsed$ = new BehaviorSubject<number>(0);

    const totalTiles = this.height * this.width;
    this.leftToUncover = totalTiles - this.totalMines;
  }

  private generateField() {
    this.field = [];
    for (let y = 0; y < this.height; y++) {
      this.field[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.field[y][x] = new Tile(this, x, y);
      }
    }
  }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }

  get totalMines(): number {
    return this._totalMines;
  }

  getTile(xPos: number, yPos: number): Tile {
    return this.field[yPos][xPos];
  }

  placeMinesAwayFrom(tile: Tile) {
    this.mineTiles = [];
    let minePlacings = this.totalMines;
    for (let i = 0; i < minePlacings; i++) {
      const xRand = this.randomInt(this.width - 1);
      const yRand = this.randomInt(this.height - 1);
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

  start(tile: Tile) {
    this.gameStatus$.next('running');
    this.startDate = new Date();
    this.timerInterval = setInterval(() => {
      const delta = Math.floor(
                    ((new Date()).getTime() - this.startDate.getTime()) / 1000);
      this.secondsElapsed$.next(delta);
    }, 1000);
    this.placeMinesAwayFrom(tile);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  uncover(tile: Tile) {
    if (this.gameStatus$.value === 'ready') { this.start(tile); }

    if (this.gameStatus$.value !== 'running') { return; }
    if (tile.uncovered) { return; }
    if (tile.flagged) { return; }

    this.uncoverings$.next();

    if (tile.mined) {
      // Lost
      this.gameStatus$.next('lost');
      tile.clickedMine = true;
      this.mineTiles.map(t => t.uncovered = true);
      this.stopTimer();
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
        if (x < 0 || x >= this.width) { continue; }
        const y = tile.yPos + dY;
        if (y < 0 || y >= this.height) { continue; }
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
      this.remainingMines$.next(0);
      this.stopTimer();
    }
  }

  toggle(tile: Tile) {
    if (this.gameStatus$.value !== 'running') { return; }
    if (tile.uncovered) { return; }

    if (tile.flagged) {
      this.remainingMines$.next(this.remainingMines$.value + 1);
      tile.flagged = false;
    } else {
      this.remainingMines$.next(this.remainingMines$.value - 1);
      tile.flagged = true;
    }
  }
}
