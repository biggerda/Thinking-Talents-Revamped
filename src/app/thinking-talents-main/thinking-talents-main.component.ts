import {Component, OnInit} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';
import {Player} from '../../entities/Player';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  toggleSkills = false;
  randomSkill: Skill = {
    name: 'Thinking Logically',
    description: 'Blah blah blah',
    checked: true,
    type: 'whole'
  };
  teammates: Player[] = [
    {
      name: 'Jennie Mai',
      talents: []
    },
    {
      name: 'Larry Halls',
      talents: []
    },
    {
      name: 'Devin Biggers',
      talents: [this.randomSkill, this.randomSkill, this.randomSkill, this.randomSkill, this.randomSkill]
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSkillsPopup(activated: boolean) {
    this.toggleSkills = activated;
  }

  updateTeam(team: Player[]) {
    this.teammates = team;
  }

  addTeammate(teammate: Player) {
    this.teammates.push(teammate);
  }
}
