import {Component, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import {ReceivedTeam, Team} from '../../entities/Team';
import {Router} from '@angular/router';

@Component({
  selector: 'app-load-team',
  templateUrl: './load-team.component.html',
  styleUrls: ['./load-team.component.scss']
})
export class LoadTeamComponent implements OnInit {
  allTeams: ReceivedTeam[];

  constructor(private _teamService: TeamService, private _route: Router) {
  }

  ngOnInit(): void {
    this._teamService.loadAllTeams()
      .subscribe(teams => this.allTeams = teams);
  }

  loadTeam(selectedTeam: ReceivedTeam): void {
    this._teamService.loadTeam(selectedTeam);
    this._route.navigate(['/']);
  }

  deleteTeam(selectedTeam: ReceivedTeam): void {
    if (confirm(`Are you sure you want to remove values for ${selectedTeam.teamName}?`)) {
      setTimeout(() => {
        this._teamService.deleteTeam(selectedTeam._id).subscribe();
        this._teamService.clearLoadedTeam();
        this.allTeams = this.allTeams.filter(team => team._id !== selectedTeam._id);
      }, 1000);
    }
  }
}
