import {Component, OnInit} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';
import {Player} from '../../entities/Player';
import {UpdatedPlayerData} from '../../entities/UpdatedPlayerData';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  toggleSkills = false;
  addNewTeammate = false;
  updatedTeammate: UpdatedPlayerData;
  randomSkill: Skill = {
    name: 'Thinking Logically',
    description: 'Blah blah blah',
    checked: true,
    type: 'whole'
  };
  randomSkill2: Skill = {
    name: 'Organizing',
    description: 'Blah blah blah',
    checked: true,
    type: 'whole'
  };
  randomSkill3: Skill = {
    name: 'Thinking Alone',
    description: 'Blah blah blah',
    checked: true,
    type: 'whole'
  };
  teammates: Player[] = [
    {
      name: 'Devin',
      talents: [this.randomSkill, this.randomSkill2, this.randomSkill3]
    },
    {
      name: 'Jeanie',
      talents: [this.randomSkill3, this.randomSkill2, this.randomSkill]
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

  addTeammate() {
    this.addNewTeammate = true;
    this.toggleSkillsPopup(true);
  }

  updateTeammate(playerToUpdate: UpdatedPlayerData) {
    this.addNewTeammate = false;
    this.updatedTeammate = playerToUpdate;
    this.toggleSkillsPopup(true);
  }

  addTeammatetoChart(teammate: Player) {
    this.teammates.push(teammate);
  }

  logCurrentTeam() {
    this.teammates.forEach(player => {
      const newTeammateTalents = player.talents.filter(talent => talent.checked);
      console.log(`Player: ${player.name} ||| Talents: ${newTeammateTalents.map(it => it.name)}`);
    });
  }
}
