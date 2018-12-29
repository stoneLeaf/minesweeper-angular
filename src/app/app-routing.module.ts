import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './components/game/game.component';
import { OptionsComponent } from './components/options/options.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: GameComponent},
  { path: 'options', component: OptionsComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
