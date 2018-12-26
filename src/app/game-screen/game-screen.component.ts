import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    if (!this.gameService.startScreenViewed) {
      return this.router.navigate(['']);
    }
    this.gameService.generateField();
  }
}
