import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';
import { FieldSize } from '../../models/field-size.model';
import { DifficultyLevel } from '../../models/difficulty-level.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  fieldSizes = FieldSize.getSizes();
  difficultyLevels = DifficultyLevel.getLevels();

  constructor(private gameService: GameService,
              private router: Router) { }

  startGame() {
    this.gameService.newGame();
    this.router.navigate(['']);
  }
}
