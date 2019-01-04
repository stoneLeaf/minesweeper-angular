import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-top-bar',
  templateUrl: './game-top-bar.component.html',
  styleUrls: ['./game-top-bar.component.scss']
})
export class GameTopBarComponent implements OnInit {
  currentGame: Game;

  gameStatus: string;
  uncovering = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.currentGame().subscribe(game => {
      this.currentGame = game;
      game.gameStatus$.subscribe((status) => {
        this.gameStatus = status;
      });
      game.uncoverings$.subscribe(() => {
        if (!this.uncovering) {
          this.uncovering = true;
          setInterval(() => {
            this.uncovering = false;
          }, 250);
        }
      });
    });
  }

  newGame() {
    this.gameService.newGame();
  }
}
