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
    this.playerName = this.teammate.name;
    this.skillsData = [...this.teammate.talents];
    this.numAnalyticalTalents = this.teammate.aTalents;
    this.numProceduralTalents = this.teammate.pTalents;
    this.numRelationalTalents = this.teammate.rTalents;
    this.numInnovativeTalents = this.teammate.iTalents;
    this.talentPreference = this.teammate.talentPref;
    this.blindSpot = this.teammate.blindSpot;
  }

  closePopup() {
    this.displayTeammatePopupEmitter.emit(false);
  }
}
