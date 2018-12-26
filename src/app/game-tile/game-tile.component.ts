import { Component, OnInit, Input } from '@angular/core';

import { Tile } from '../tile';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss']
})
export class GameTileComponent implements OnInit {
  @Input() tile: Tile;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  onLeftClick() {
    this.gameService.uncover(this.tile);
  }

  onRightClick() {
    this.gameService.toggle(this.tile);
    return false;
  }
}
