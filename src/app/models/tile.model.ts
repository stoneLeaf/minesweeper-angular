export class Tile {
  number = 0;
  flagged = false;
  uncovered = false;
  mined = false;
  clickedMine = false;

  constructor(public xPos: number, public yPos: number) {}
}
