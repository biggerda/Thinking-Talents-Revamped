import {Component, OnInit} from '@angular/core';
import {Team} from '../../entities/Team';
import {MapSkill} from '../../entities/MapSkill';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.scss']
})
export class TeamMapComponent implements OnInit {

  names: string[];
  team: Team;
  mapData: MapSkill[];

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe( params => {
      this.team = params.teamData;
      this.mapData = params.mapData;
      console.log('team size: ', this.team.players.length);
    });
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
