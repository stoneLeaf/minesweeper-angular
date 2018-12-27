/**
 * Class representing a field size.
 */
export class FieldSize {
  static Small = new FieldSize('Small', 9, 9);
  static Medium = new FieldSize('Medium', 16, 16);
  static Large = new FieldSize('Large', 16, 30);

  static getSizes(): FieldSize[] {
    const sizes = [];
    for (const property of Object.keys(FieldSize)) {
      if (FieldSize[property] instanceof FieldSize) {
        sizes.push(FieldSize[property]);
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
