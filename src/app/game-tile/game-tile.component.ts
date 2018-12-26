import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../tile';
import { GameService } from '../game.service';
import { flatten } from '@angular/core/src/render3/util';

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
    this.gameService.flag(this.tile);
    return false;
  }
}
