import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';
import {Player} from '../../entities/Player';
import {UpdatedPlayerData} from '../../entities/UpdatedPlayerData';
import {Team} from '../../entities/Team';
import {MapSkill} from '../../entities/MapSkill';
import {mapSkillsData} from '../../entities/mapSkillsData';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  talentData: Skill[] = skillsData;
  mapData: MapSkill[] = mapSkillsData;
  toggleSkills = false;
  toggleDisplayTeammate = false;
  addNewTeammate = false;
  updatedTeammate: UpdatedPlayerData;
  displayedTeammate: Player;
  disableTeamNameInput = true;
  teamName = '';
  showMap = false;

  @ViewChild('teamNameCheckbox') teamNameCheckbox: ElementRef;

  randomSkill: Skill = this.talentData[5];
  randomSkill2: Skill = this.talentData[10];
  randomSkill3: Skill = this.talentData[15];
  randomSkill4: Skill = this.talentData[7];
  randomSkill5: Skill = this.talentData[12];
  randomSkill6: Skill = this.talentData[17];
  randomSkill7: Skill = this.talentData[20];
  randomSkill8: Skill = this.talentData[26];
  teamData: Team;
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

  constructor(private _route: Router) {
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
    this.teammates.forEach(player => {
      const playerName = player.name;
      const playerTalentList = player.talents.map(talent => talent.name);

      this.mapData.forEach(talent => {
        if (playerTalentList.includes(talent.name) && !talent.playerNames.includes(playerName)) {
          talent.playerNames.push(playerName);
          talent.checked = true;
        }
      });
    });

    this.teamData = {
      players: this.teammates,
      teamName: this.teamName,
      teamPreferences: this.teammates.map(it => it.talentPref),
      teamBlindspots: this.teammates.map(it => it.blindSpot),
    };

    this._route.navigate(['map'], { queryParams: { teamData: this.teamData, mapData: this.mapData }});
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
    this.showMap = false;
    this.addNewTeammate = false;
    this.updatedTeammate = playerToUpdate;
    this.toggleSkillsPopup(true);
  }

  addTeammatetoChart(teammate: Player) {
    this.showMap = false;
    this.teammates.push(teammate);
  }

  removeTeammateFromChart(index: number) {
    this.showMap = false;
    const removedPlayer = this.teammates[index];
    const removedTalents = removedPlayer.talents.map(talent => talent.name);

    this.mapData.forEach(talent => {
      if (removedTalents.includes(talent.name)) {
        const removedIndexOfTalent = talent.playerNames.indexOf(removedPlayer.name);
        talent.playerNames.splice(removedIndexOfTalent, 1);

        if (talent.playerNames.length === 0) {
          talent.checked = false;
        }
      }
    });

    this.teammates.splice(index, 1);
  }

  resetTeam() {
    if (this.disableTeamNameInput === false) {
      // tslint:disable-next-line:no-string-literal
      this.teamNameCheckbox['checked'] = false;
      this.toggleTeamNameInput();
    }

    this.teammates = [];
    this.mapData.forEach(talent => {
      talent.playerNames = [];
      talent.checked = false;
    });

    this.showMap = false;
  }

  logCurrentTeam() {
    this.teammates.forEach(player => {
      const newTeammateTalents = player.talents.filter(talent => talent.checked);
      console.log(`Player: ${player.name} ||| Talents: ${newTeammateTalents.map(it => it.name)}`);
    });
  }

  toggleTeamNameInput() {
    this.showMap = false;
    this.disableTeamNameInput = !this.disableTeamNameInput;
    this.teamName = '';
  }

  changeTeamName() {
    this.showMap = false;
  }
}
