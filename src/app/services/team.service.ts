import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../../entities/Team';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly pathname;

  constructor(private readonly _http: HttpClient, private _location: Location) {
    this.pathname = this._location.path();
  }

  getSampleTeams(): Observable<Team> {
    const sampleTeamApi = this.pathname + 'api/team/sample';
    return this._http.get<Team>(sampleTeamApi);
  }

  saveTeam(team: Team): Observable<any> {
    const saveTeamApi = this.pathname + 'api/team/save';
    const postBody = JSON.stringify(team);
    const postHeaders = {'content-type': 'application/json'};

    return this._http.post<any>(saveTeamApi, postBody, {headers: postHeaders});
  }
}
