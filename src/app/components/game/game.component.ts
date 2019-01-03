import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  routerEventsSubscription;

  constructor(private gameService: GameService,
              private router: Router) {
    // This allows game reset when clicking on the nav bar 'New game' link
    // while already being on the game route.
    // Requires the onSameUrlNavigation: 'reload' option on the RouterModule.
    this.routerEventsSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.gameService.newGame();
      }
    });
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }
}
