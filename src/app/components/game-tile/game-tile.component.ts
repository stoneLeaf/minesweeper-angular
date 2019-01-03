import { Component, Input } from '@angular/core';

import { Tile } from '../../models/tile.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss']
})
export class GameTileComponent {
  @Input() tile: Tile;

  constructor(private gameService: GameService) { }

  onLeftClick() {
    this.gameService.getCurrentGame().uncover(this.tile);
  }

  onRightClick() {
    this.gameService.getCurrentGame().toggle(this.tile);
    return false;
  }
}
