import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThinkingTalentsMainComponent} from './thinking-talents-main/thinking-talents-main.component';
import {TeamMapComponent} from './team-map/team-map.component';
import {TeamAnalysisComponent} from './team-analysis/team-analysis.component';
import {LoadTeamComponent} from './load-team/load-team.component';

const routes: Routes = [
  {
    path: '',
    component: ThinkingTalentsMainComponent
  },
  {
    path: 'map',
    component: TeamMapComponent
  },
  {
    path: 'analysis',
    component: TeamAnalysisComponent
  },
  {
    path: 'load',
    component: LoadTeamComponent
  },
  {
    path: '**',
    component: ThinkingTalentsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
