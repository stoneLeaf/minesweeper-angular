import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  private coordinatesArray(length: number): number[] {
    return Array.from(Array(length).keys());
  }

  heightArray(): number[] {
    return this.coordinatesArray(this.gameService.fieldSize.getHeight());
  }

  widthArray(): number[] {
    return this.coordinatesArray(this.gameService.fieldSize.getWidth());
  }
}
