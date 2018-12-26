/**
 * Class representing a difficulty level.
 */
export class DifficultyLevel {
  static Beginner = new DifficultyLevel('Beginner', 15);
  static Intermediate = new DifficultyLevel('Intermediate', 25);
  static Expert = new DifficultyLevel('Expert', 35);

  static getLevels(): DifficultyLevel[] {
    const levels = [];
    for (const property of Object.keys(DifficultyLevel)) {
      if (DifficultyLevel[property] instanceof DifficultyLevel) {
        levels.push(DifficultyLevel[property]);
      }
    }
    return levels;
  }

  private constructor(private name: string,
                      private mineRatio: number) { }

  getName(): string {
    return this.name;
  }

  getMineRatio(): number {
    return this.mineRatio;
  }
}
