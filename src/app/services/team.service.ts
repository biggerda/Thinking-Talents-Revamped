import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ReceivedTeam, Team} from '../../entities/Team';
import {Location} from '@angular/common';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly _pathname;
  private _loadedTeam: ReceivedTeam;

  get loadedTeam(): ReceivedTeam {
    return this._loadedTeam;
  }

  constructor(private readonly _http: HttpClient, private _location: Location) {
    this._pathname = this._location.path();
  }

  getSampleTeams(): Observable<Team> {
    const sampleTeamApi = this._pathname + 'api/team/sample';
    return this._http.get<Team>(sampleTeamApi);
  }

  loadTeam(team: ReceivedTeam): void {
    this._loadedTeam = team;
  }

  clearLoadedTeam(): void {
    this._loadedTeam = null;
  }

  loadAllTeams(): Observable<ReceivedTeam[]> {
    const loadAllTeamApi = this._pathname + 'api/teams';
    return this._http.get<ReceivedTeam[]>(loadAllTeamApi);
  }

  saveTeam(team: Team): Observable<any> {
    const teamId = this.loadedTeam ? this.loadedTeam._id : 'new';
    const saveTeamApi = this._pathname + 'api/team/save/' + teamId;
    const postBody = JSON.stringify(team);
    const postHeaders = {'content-type': 'application/json'};

    return this._http.post<any>(saveTeamApi, postBody, {headers: postHeaders});
  }
}
