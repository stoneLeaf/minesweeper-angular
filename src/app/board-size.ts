/**
 * Class used to represent a board size.
 */
export class BoardSize {
  static Small = new BoardSize('Small', 8, 8);
  static Medium = new BoardSize('Medium', 16, 16);
  static Large = new BoardSize('Large', 32, 32);

  static getSizes(): BoardSize[] {
    // TODO: make it dynamic
    return [BoardSize.Small, BoardSize.Medium, BoardSize.Large];
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
