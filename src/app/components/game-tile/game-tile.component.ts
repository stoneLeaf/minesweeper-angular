import { Component, Input } from '@angular/core';

import { Tile } from '../../models/tile.model';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss']
})
export class GameTileComponent {
  @Input() tile: Tile;

  onLeftClick() {
    this.tile.parentGame.uncover(this.tile);
  }

  onRightClick() {
    this.tile.parentGame.toggle(this.tile);
    return false;
  }
}
