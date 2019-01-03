import { Game } from './game.model';

/**
 * Class representing a game tile.
 */
export class Tile {
  number = 0;
  flagged = false;
  uncovered = false;
  mined = false;
  clickedMine = false;

  constructor(public parentGame: Game, public xPos: number, public yPos: number) {}
}
