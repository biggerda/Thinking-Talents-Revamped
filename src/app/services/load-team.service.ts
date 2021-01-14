import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Player} from '../../entities/Player';

@Injectable({
  providedIn: 'root'
})
export class LoadTeamService {

  private teamUrl = 'http://127.0.0.1:8080/team';  // URL to web api

  constructor(private readonly _http: HttpClient) {
  }

  getTeam(): Observable<Player[]> {
    return this._http.get<Player[]>(this.teamUrl);
  }
}
