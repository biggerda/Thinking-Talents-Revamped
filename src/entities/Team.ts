import {Player} from './Player';
import {MapSkill} from './MapSkill';

export interface Team {
  players: Player[];
  stuffed?: boolean;
  teamName?: string;
  teamPreferences?: string[];
  teamBlindspots?: string[];
}

export interface ReceivedTeam {
  _id: string;
  players: Player[];
  stuffed?: boolean;
  teamName?: string;
  teamPreferences?: string[];
  teamBlindspots?: string[];
}
