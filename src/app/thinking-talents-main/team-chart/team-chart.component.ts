import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from '../../../entities/Player';
import {UpdatedPlayerData} from '../../../entities/UpdatedPlayerData';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.scss']
})
export class TeamChartComponent {
  @Output()
  addPlayerEmitter = new EventEmitter<boolean>();

  @Output()
  viewPlayerEmitter = new EventEmitter<Player>();

  @Output()
  updatePlayerEmitter = new EventEmitter<UpdatedPlayerData>();

  @Output()
  removeTeammateFromChartEmitter = new EventEmitter<number>();

  @Output()
  updateTeamEmitter = new EventEmitter<Player[]>();

  @Output()
  resetTeamEmitter = new EventEmitter<boolean>();

  @Output()
  generateTeamMap = new EventEmitter();

  @Input()
  teammates: Player[];

  removePlayer = false;
  removeAllPlayers = false;

  constructor() {
  }


  get teammatesExist(): boolean {
    return this.teammates.length > 0;
  }

  addPerson() {
    this.addPlayerEmitter.emit(true);
  }

  editPerson(index: number, player: Player) {
    this.updatePlayerEmitter.emit({index, player});
  }

  removePerson(index: number, playerName: string) {
    if (confirm(`Are you sure you want to remove values for ${playerName}?`)) {
      this.teammates[index].isDisplayed = false;
      setTimeout(() => {
        this.removeTeammateFromChartEmitter.emit(index);
        this.teammates = this.teammates.filter(teammate => teammate.name !== playerName);
        this.updateTeamEmitter.emit(this.teammates);
      }, 1000);
    }
  }

  generateMap() {
    this.generateTeamMap.emit();
  }

  reset() {
    if (confirm(`Are you sure you want to start over?`)) {
      this.removeAllPlayers = true;
      setTimeout(() => {
        this.resetTeamEmitter.emit(true);
        this.removeAllPlayers = false;
      }, 1000);
    }
  }
}
