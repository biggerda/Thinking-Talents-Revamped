import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Player} from '../../../entities/Player';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.scss']
})
export class TeamChartComponent implements OnInit {
  @Output() skillsPopupEmitter = new EventEmitter<boolean>();

  teammates: Player[] = [
    {name: 'Jennie Mai'},
    {name: 'Larry Hals'},
    {name: 'Devin Biggers'},
  ];

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

  removePerson() {

  }
}
