import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Skill} from '../../../entities/Skill';
import {Player} from '../../../entities/Player';

@Component({
  selector: 'app-display-teammate',
  templateUrl: './display-teammate.component.html',
  styleUrls: ['./display-teammate.component.scss']
})
export class DisplayTeammateComponent implements OnInit {
  private _clickedInside = true;

  playerName: string;
  skillsData: Skill[];
  numAnalyticalTalents: number;
  numProceduralTalents: number;
  numRelationalTalents: number;
  numInnovativeTalents: number;
  talentPreference: string;
  blindSpot: string;

  @Input()
  teammate: Player;

  @Output()
  displayTeammatePopupEmitter = new EventEmitter<boolean>();

  @HostListener('click')
  clickInsideElement() {
    this._clickedInside = true;
  }

  @HostListener('document:click')
  clickAction() {
    if (!this._clickedInside) {
      this.closePopup();
    }
    this._clickedInside = false;
  }

  constructor() {
  }

  ngOnInit(): void {
    const {
      name,
      talents,
      aTalents,
      pTalents,
      rTalents,
      iTalents,
      talentPref,
      blindSpot
    } = this.teammate;

    this.playerName = name;
    this.skillsData = [...talents];
    this.numAnalyticalTalents = aTalents;
    this.numProceduralTalents = pTalents;
    this.numRelationalTalents = rTalents;
    this.numInnovativeTalents = iTalents;
    this.talentPreference = talentPref;
    this.blindSpot = blindSpot;
  }

  closePopup() {
    this.displayTeammatePopupEmitter.emit(false);
  }
}
