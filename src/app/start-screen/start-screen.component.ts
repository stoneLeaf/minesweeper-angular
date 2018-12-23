import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { BoardSize } from '../board-size';
import { DifficultyLevel } from '../difficulty-level';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  boardSizes = BoardSize.getSizes();
  difficultyLevels = DifficultyLevel.getLevels();

  constructor(private gameService: GameService) { }

  ngOnInit() { }

}
