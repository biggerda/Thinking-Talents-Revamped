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
  updatePlayerEmitter = new EventEmitter<UpdatedPlayerData>();

  @Output()
  updateTeamEmitter = new EventEmitter<Player[]>();

  @Input()
  teammates: Player[];

  constructor() {
  }

  ngOnInit() {
  }

  addPerson() {
    this.addPlayerEmitter.emit(true);
  }

  viewPerson() {

  }

  editPerson(index: number, player: Player) {
    this.updatePlayerEmitter.emit({index, player});
  }

  removePerson(playerName: string) {
    this.teammates = this.teammates = this.teammates.filter(teammate => teammate.name !== playerName);
    this.updateTeamEmitter.emit(this.teammates);
  }
}
