import {Skill} from './Skill';

export interface Player {
  name: string;
  talents: Skill[];
  aTalents?: number;
  pTalents?: number;
  rTalents?: number;
  iTalents?: number;
  talentPref?: string;
  blindSpot?: string;
  isDisplayed?: boolean;
}
