import { Component, OnInit } from '@angular/core';
import {Team} from '../../entities/Team';
import {MapSkill} from '../../entities/MapSkill';
import {ActivatedRoute, Router} from '@angular/router';
import {MapGenerationService} from '../services/map-generation.service';

@Component({
  selector: 'app-team-analysis',
  templateUrl: './team-analysis.component.html',
  styleUrls: ['./team-analysis.component.scss']
})
export class TeamAnalysisComponent implements OnInit {
  names: string[];
  team: Team;
  mapData: MapSkill[];

  constructor(private _router: Router, private _route: ActivatedRoute, private _mapGen: MapGenerationService) {
    if (!this._mapGen.teamData) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.team = this._mapGen.teamData;
    this.mapData = this._mapGen.mapData;
  }
}
