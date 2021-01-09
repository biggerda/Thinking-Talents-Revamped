import {Injectable} from '@angular/core';
import {Player} from '../../entities/Player';
import {MapSkill} from '../../entities/MapSkill';
import {Team} from '../../entities/Team';

@Injectable({
  providedIn: 'root'
})
export class MapGenerationService {
  private _teamData: Team;
  private _mapData: MapSkill[];

  get teamData(): Team {
    return this._teamData;
  }

  get mapData(): MapSkill[] {
    return this._mapData;
  }

  transferData(teamData: Team, mapData: MapSkill[]): void {
    this._teamData = teamData;
    this._mapData = mapData;
  }
}
