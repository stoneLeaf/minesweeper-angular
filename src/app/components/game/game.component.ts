import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.gameService.newGame();
  }

  ngOnDestroy(): void {
    console.log('game component destroyed');
  }
}
