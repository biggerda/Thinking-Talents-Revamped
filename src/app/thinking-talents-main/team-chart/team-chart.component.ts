import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../entities/Player';
import {UpdatedPlayerData} from '../../../entities/UpdatedPlayerData';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.scss']
})
export class TeamChartComponent implements OnInit {
  @Output()
  addPlayerEmitter = new EventEmitter<boolean>();

  @Output()
  viewPlayerEmitter = new EventEmitter<Player>();

  @Output()
  updatePlayerEmitter = new EventEmitter<UpdatedPlayerData>();

  @Output()
  updateTeamEmitter = new EventEmitter<Player[]>();

  @Output()
  resetTeamEmitter = new EventEmitter<boolean>();

  @Input()
  teammates: Player[];

  constructor() {
  }

  ngOnInit() {
  }

  addPerson() {
    this.addPlayerEmitter.emit(true);
  }

  editPerson(index: number, player: Player) {
    this.updatePlayerEmitter.emit({index, player});
  }

  removePerson(playerName: string) {
    if (confirm(`Are you sure you want to remove values for ${playerName}?`)) {
      this.teammates = this.teammates = this.teammates.filter(teammate => teammate.name !== playerName);
      this.updateTeamEmitter.emit(this.teammates);
    }
  }

  generateTeamMap() {

  }

  reset() {
    if (confirm(`Are you sure you want to start over?`)) {
      this.resetTeamEmitter.emit(true);
    }
  }
}
