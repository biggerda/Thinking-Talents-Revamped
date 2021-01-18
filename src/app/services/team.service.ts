import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../../entities/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // private teamUrl = 'http://127.0.0.1:8080/api/sample-team';  // URL to web api
  private teamUrl = 'http://nwo-dev.herokuapp.com/api/teams';  // URL to web api

  constructor(private readonly _http: HttpClient) {
  }

  getSampleTeams(): Observable<Team> {
    return this._http.get<Team>(this.teamUrl);
  }
}
