import {Component, OnInit} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';
import {Player} from '../../entities/Player';
import {UpdatedPlayerData} from '../../entities/UpdatedPlayerData';
import {Team} from '../../entities/Team';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  skillsDataTesting: Skill[] = skillsData;
  toggleSkills = false;
  toggleDisplayTeammate = false;
  addNewTeammate = false;
  updatedTeammate: UpdatedPlayerData;
  displayedTeammate: Player;
  disableTeamNameInput: boolean;
  showMap = false;
  teamData: Team;

  randomSkill: Skill = this.skillsDataTesting[5];
  randomSkill2: Skill = this.skillsDataTesting[10];
  randomSkill3: Skill = this.skillsDataTesting[15];
  randomSkill4: Skill = this.skillsDataTesting[7];
  randomSkill5: Skill = this.skillsDataTesting[12];
  randomSkill6: Skill = this.skillsDataTesting[17];
  randomSkill7: Skill = this.skillsDataTesting[20];
  randomSkill8: Skill = this.skillsDataTesting[26];
  teammates: Player[] = [
    {
      name: 'Devin',
      talents: [
        {...this.randomSkill, checked: true},
        {...this.randomSkill2, checked: true},
        {...this.randomSkill3, checked: true},
        {...this.randomSkill6, checked: true},
        {...this.randomSkill7, checked: true},
        {...this.randomSkill8, checked: true},
      ],
      aTalents: 1,
      iTalents: 2,
      rTalents: 2,
      pTalents: 1,
      talentPref: 'Whole-Brained',
      blindSpot: 'None (Whole-Brained)',
      isDisplayed: true
    },
    {
      name: 'Jeanie',
      talents: [
        {...this.randomSkill2, checked: true},
        {...this.randomSkill4, checked: true},
        {...this.randomSkill5, checked: true},
        {...this.randomSkill6, checked: true},
      ],
      aTalents: 1,
      iTalents: 0,
      rTalents: 1,
      pTalents: 0,
      talentPref: 'Facts vs. Feelings (A/R)',
      blindSpot: 'Entrepreneur (I/P)',
      isDisplayed: true
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSkillsPopup(activated: boolean) {
    this.toggleSkills = activated;
  }

  toggleDisplayTeammatePopup(activated: boolean) {
    this.toggleDisplayTeammate = activated;
  }

  updateTeam(team: Player[]) {
    this.teammates = team;
  }

  generateMap() {
    this.teamData = {
      players: this.teammates
    };

    this.showMap = true;
  }

  addTeammate() {
    this.addNewTeammate = true;
    this.toggleSkillsPopup(true);
  }

  viewTeammate(playerToView: Player) {
    this.displayedTeammate = playerToView;
    this.toggleDisplayTeammatePopup(true);
  }

  updateTeammate(playerToUpdate: UpdatedPlayerData) {
    this.addNewTeammate = false;
    this.updatedTeammate = playerToUpdate;
    this.toggleSkillsPopup(true);
  }

  addTeammatetoChart(teammate: Player) {
    this.teammates.push(teammate);
  }

  resetTeam() {
    this.teammates = [];
  }

  logCurrentTeam() {
    this.teammates.forEach(player => {
      const newTeammateTalents = player.talents.filter(talent => talent.checked);
      console.log(`Player: ${player.name} ||| Talents: ${newTeammateTalents.map(it => it.name)}`);
    });
  }

  toggleTeamNameInput() {
    console.log(this.disableTeamNameInput);
  }
}
