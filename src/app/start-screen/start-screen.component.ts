import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import { FieldSize } from '../field-size';
import { DifficultyLevel } from '../difficulty-level';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  fieldSizes = FieldSize.getSizes();
  difficultyLevels = DifficultyLevel.getLevels();

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.gameService.startScreenViewed = true;
  }

  startGame() {
    this.router.navigate(['field']);
  }
}
