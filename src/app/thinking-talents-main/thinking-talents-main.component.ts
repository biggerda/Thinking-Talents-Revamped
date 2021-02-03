import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';
import {Player} from '../../entities/Player';
import {UpdatedPlayerData} from '../../entities/UpdatedPlayerData';
import {Team} from '../../entities/Team';
import {MapSkill} from '../../entities/MapSkill';
import {mapSkillsData} from '../../entities/mapSkillsData';
import {ActivatedRoute, Router} from '@angular/router';
import {MapGenerationService} from '../services/map-generation.service';
import {TeamService} from '../services/team.service';
import {filter, map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

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
  showMap = false;
  teamInputForm: FormGroup;

  @ViewChild('teamNameCheckbox') teamNameCheckbox: ElementRef;

  teamData: Team;
  teamName = '';
  teammates: Player[] = [];

  constructor(
    private _route: Router,
    private _router: ActivatedRoute,
    private _mapGen: MapGenerationService,
    private _teamService: TeamService) {
  }

  ngOnInit(): void {
    if (this._mapGen.teamData) {
      this.teammates = this._mapGen.teamData.players;
      this.teamName = this._mapGen.teamData.teamName;
    }

    if (this._teamService.loadedTeam) {
      this.teammates = this._teamService.loadedTeam.players;
      this.teamName = this._teamService.loadedTeam.teamName;
    }
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

  loadTeams() {
    this._teamService.clearLoadedTeam();
    this._route.navigate(['load']);
  }

  saveCurrentTeam() {
    this.syncData();
    this._teamService.saveTeam(this.teamData).subscribe();
  }

  syncData() {
    this.teammates.forEach(player => {
      const playerName = player.name;
      const playerTalentList = player.talents.map(talent => talent.name);
      player.isDisplayed = true;

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
      teamBlindspots: this.teammates.map(it => it.blindSpot)
    };

    this._mapGen.transferData(this.teamData, this.mapData);
  }

  generateMap() {
    this.syncData();
    this._route.navigate(['map']);
  }

  generateAnalysis() {
    this.syncData();
    this._route.navigate(['analysis']);
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
    teammate.isDisplayed = true;
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
    this.teamName = '';
    this.teammates = [];
    this.mapData.forEach(talent => {
      talent.playerNames = [];
      talent.checked = false;
    });

    this._teamService.clearLoadedTeam();
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
