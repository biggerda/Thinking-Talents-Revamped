import {Component, OnInit} from '@angular/core';
import {Team} from '../../entities/Team';
import {MapSkill} from '../../entities/MapSkill';
import {ActivatedRoute} from '@angular/router';
import {MapGenerationService} from '../services/map-generation.service';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.scss']
})
export class TeamMapComponent implements OnInit {

  names: string[];
  team: Team;
  mapData: MapSkill[];

  constructor(private _route: ActivatedRoute, private _mapGen: MapGenerationService) {
  }

  ngOnInit() {
    this.team = this._mapGen.teamData;
    this.mapData = this._mapGen.mapData;
  }

  isChecked(skillName: string) {
    return this.mapData
      .filter(skill => skill.name === skillName)
      .map(skill => skill.checked);
    // console.log(`isChecked: ${skillName}: ${checked}`);
  }

  isStuffed(): boolean {
    return this.team.stuffed;
  }

  getNames(skillName: string): string[] {
    this.mapData
      .filter(skill => skill.name === skillName)
      .map(skill => this.names = skill.playerNames);

    // console.log(`Get Names: ${skillName}: ${this.names}`);
    return this.names;
  }

}
