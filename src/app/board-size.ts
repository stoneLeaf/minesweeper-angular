/**
 * Class representing a board size.
 */
export class BoardSize {
  static Small = new BoardSize('Small', 8, 8);
  static Medium = new BoardSize('Medium', 16, 16);
  static Large = new BoardSize('Large', 32, 32);

  static getSizes(): BoardSize[] {
    const sizes = [];
    for (const property of Object.keys(BoardSize)) {
      if (BoardSize[property] instanceof BoardSize) {
        sizes.push(BoardSize[property]);
      }
    }
    return sizes;
  }

  private constructor(private name: string,
                      private height: number,
                      private width: number) {

  }

  getName(): string {
    return this.name;
  }

  getHeight(): number {
    return this.height;
  }

  getWidth(): number {
    return this.width;
  }
}
