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
    const sampleTeamApi = this.pathname + 'api/sample-team';
    console.log('Save Team API: ', sampleTeamApi);
    return this._http.get<Team>(sampleTeamApi);
  }

  saveTeam(team: Team): Observable<any> {
    const saveTeamApi = this.pathname + 'api/save';
    const postHeaders = {'content-type': 'application/json'};
    const postBody = JSON.stringify(team);

    // console.log('Save Team API STRINGIFY: ', postBody);
    return this._http.post<any>(saveTeamApi, postBody, {headers: postHeaders});
  }
}
