import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
  }

  newGame() {
    this.gameService.newGame();
    this.router.navigate(['']);
  }

  showOptions() {
    this.router.navigate(['options']);
  }

  showAbout() {
    this.router.navigate(['about']);
  }
}
