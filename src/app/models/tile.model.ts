export class Tile {
  flagged = false;
  uncovered = false;
  mined = false;
  text = '';

  constructor(public xPos: number, public yPos: number) {}
}
