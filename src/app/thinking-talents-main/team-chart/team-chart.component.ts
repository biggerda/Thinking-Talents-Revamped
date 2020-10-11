import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../entities/Player';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.scss']
})
export class TeamChartComponent implements OnInit {
  @Output()
  skillsPopupEmitter = new EventEmitter<boolean>();

  @Output()
  updateTeamEmitter = new EventEmitter<Player[]>();

  @Input()
  teammates: Player[];

  constructor() {
  }

  ngOnInit() {
  }

  addPerson() {
    this.skillsPopupEmitter.emit(true);
  }

  viewPerson() {

  }

  editPerson() {

  }

  removePerson(playerName: string) {
    this.teammates = this.teammates = this.teammates.filter(teammate => teammate.name !== playerName);
    this.updateTeamEmitter.emit(this.teammates);
  }
}
