import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-top-bar',
  templateUrl: './game-top-bar.component.html',
  styleUrls: ['./game-top-bar.component.scss']
})
export class GameTopBarComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() { }
}
