import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../../entities/Team';
import {MapSkill} from '../../../entities/MapSkill';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.scss']
})
export class TeamMapComponent implements OnInit {

  @Input()
  team: Team;

  @Input()
  mapData: MapSkill[];

  constructor() {
  }

  ngOnInit() {
    console.log(this.mapData);
  }

  isChecked(skillName: string) {
    const checked = this.mapData
      .filter(skill => skill.name === skillName)
      .map(skill => skill.checked);
    console.log(`isChecked: ${skillName}: ${checked}`);
    return checked;
  }

  isStuffed(): boolean {
    return this.team.stuffed;
  }

  getNames(skillName: string) {
    const names = this.mapData
      .filter(skill => skill.name === skillName)
      .map(skill => skill.playerNames);
    console.log(`Get Names: ${skillName}: ${names}`);
    return names;
  }

}
