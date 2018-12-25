import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss']
})
export class GameTileComponent implements OnInit {
  // Coordinates on the field
  @Input() xPos: number;
  @Input() yPos: number;

  constructor() { }

  ngOnInit() {
  }

}
