import {Component, Input} from '@angular/core';
import {Team} from '../../../entities/Team';
import {MapSkill} from '../../../entities/MapSkill';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.scss']
})
export class TeamMapComponent {

  names: string[];

  @Input()
  team: Team;

  @Input()
  mapData: MapSkill[];

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

  getNames(skillName: string): string[] {
    this.mapData
      .filter(skill => skill.name === skillName)
      .map(skill => this.names = skill.playerNames);

    console.log(`Get Names: ${skillName}: ${this.names}`);
    return this.names;
  }

}
