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
    return this._http.get<Team>(sampleTeamApi);
  }
}
