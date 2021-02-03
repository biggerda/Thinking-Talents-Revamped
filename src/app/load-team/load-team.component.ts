import {Component, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import {ReceivedTeam, Team} from '../../entities/Team';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-load-team',
  templateUrl: './load-team.component.html',
  styleUrls: ['./load-team.component.scss']
})
export class LoadTeamComponent implements OnInit {
  allTeams: Observable<ReceivedTeam[]>;

  constructor(private _teamService: TeamService, private _route: Router) {
  }

  ngOnInit(): void {
    this.allTeams = this._teamService.loadAllTeams();
  }

  loadTeam(receivedTeam: ReceivedTeam): void {
    this._teamService.loadTeam(receivedTeam);
    this._route.navigate(['/']);
  }
}
