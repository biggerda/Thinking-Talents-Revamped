import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../../entities/Team';
import {Skill} from '../../../entities/Skill';
import {skillsData} from '../../../entities/skillsData';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.scss']
})
export class TeamMapComponent implements OnInit {

  skills: Skill[] = skillsData;

  @Input()
  team: Team;

  constructor() {
  }

  ngOnInit(): void {
  }

  isChecked(skillName: string) {
    const index = this.skills.map((skill) => skill.name).indexOf(skillName);
    return index >= 0 ? this.skills[index].checked : false;
  }

  isStuffed(): boolean {
    return this.team.stuffed;
  }

  getNames(skillName: string) {
    const index = this.skills.map((skill) => skill.name).indexOf(skillName);
    return this.skills[index].name;
  }

}
