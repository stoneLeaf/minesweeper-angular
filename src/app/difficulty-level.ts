/**
 * Class used to represent a difficulty level.
 */
export class DifficultyLevel {
  static Beginner = new DifficultyLevel('Beginner', 15);
  static Intermediate = new DifficultyLevel('Intermediate', 8);
  static Expert = new DifficultyLevel('Expert', 4);

  static getLevels(): DifficultyLevel[] {
    // TODO: do it dynamically
    return [DifficultyLevel.Beginner,
            DifficultyLevel.Intermediate,
            DifficultyLevel.Expert];
  }

  private constructor(private name: string,
                      private mineFrequency: number) { }

  getName(): string {
    return this.name;
  }

  getMineFrequency(): number {
    return this.mineFrequency;
  }
}
