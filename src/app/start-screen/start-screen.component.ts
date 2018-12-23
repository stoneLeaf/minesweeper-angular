import { Component, OnInit } from '@angular/core';

// TODO: enumerate enums in template instead of hard-coding
// see https://stackoverflow.com/questions/38554562/how-can-i-use-ngfor-to-iterate-over-typescript-enum-as-an-array-of-strings

enum BoardSize {
  Small,
  Medium,
  Large
}

enum DifficultyLevel {
  Beginner,
  Intermediate,
  Expert
}

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  BoardSize = BoardSize;
  DifficultyLevel = DifficultyLevel;

  size: BoardSize;
  difficulty: DifficultyLevel;

  constructor() { }

  ngOnInit() {
    this.size = BoardSize.Medium;
    this.difficulty = DifficultyLevel.Beginner;
  }

  selectSize(size: BoardSize) {
    this.size = size;
  }

  selectDifficulty(difficulty: DifficultyLevel) {
    this.difficulty = difficulty;
  }

}
