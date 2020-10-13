import {Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {skillsData} from '../../../entities/skillsData';
import {Skill} from '../../../entities/Skill';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Player} from '../../../entities/Player';
import {UpdatedPlayerData} from '../../../entities/UpdatedPlayerData';

interface PlayerTalentDetails {
  aTalents: number;
  pTalents: number;
  rTalents: number;
  iTalents: number;
  talentPref: string;
  blindSpot: string;
}

@Component({
  selector: 'app-skills-popup',
  templateUrl: './skills-popup.component.html',
  styleUrls: ['./skills-popup.component.scss']
})

export class SkillsPopupComponent implements OnInit, OnChanges, OnDestroy {
  skillsData: Skill[] = skillsData;
  private _clickedInside = true;
  playerName: string;
  newTeammate: Player;
  newPersonForm: FormGroup;

  @Input()
  updatedTeammate: UpdatedPlayerData;

  @Input()
  isAddingTeammate: boolean;

  @Output()
  skillsPopupEmitter = new EventEmitter<boolean>();

  @Output()
  addTeammatetoChartEmitter = new EventEmitter<Player>();

  @Output()
  updateTeammateOnChartEmitter = new EventEmitter<UpdatedPlayerData>();

  get numChecked(): number {
    const numChecked = this.skillsData.filter(it => it.checked);
    return numChecked.length;
  }

  get anyChecked(): boolean {
    const numChecked = this.skillsData.filter(it => it.checked);
    return numChecked.length > 3;
  }

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
    this.newPersonForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isAddingTeammate ? this.addNewTeammate()
      : this.updateTeammate(this.updatedTeammate);
  }

  ngOnDestroy() {
    this.resetData();
  }

  addNewTeammate() {
    this.resetData();
  }

  updateTeammate(updatedPlayerData: UpdatedPlayerData) {
    const checkedTalents = updatedPlayerData.player.talents.map(talent => talent);

    this.skillsData.forEach((talent, index) => {
      checkedTalents.forEach(checkedTalent => {
        if (checkedTalent.name === talent.name) {
          this.skillsData[index].checked = true;
        }
      });
    });

    this.playerName = updatedPlayerData.player.name;
  }

  toggleSelectTalent(skill: Skill) {
    const index = this.skillsData.indexOf(skill);
    this.skillsData[index].checked = !this.skillsData[index].checked;
  }

  listSelectedTalents(): Skill[] {
    return this.skillsData.filter(skill => skill.checked === true);
  }

  onSubmit(customerName) {
    // Only call this method if name and at least 4 thinking talents have been entered
    // Creates new teammate with a name and thinking talent list
    // Adds name back to the team chart once completed
    const selectedTalents = this.listSelectedTalents().sort();
    const playerTalentDetails: PlayerTalentDetails = this.computeThinkingTalents(selectedTalents);

    if (this.isAddingTeammate) {
      this.newTeammate = {
        name: customerName,
        talents: selectedTalents,
        ...playerTalentDetails
      };
      this.addTeammatetoChartEmitter.emit(this.newTeammate);
    } else {
      this.updatedTeammate.player.name = customerName;
      this.updatedTeammate.player.talents = this.skillsData.filter(it => it.checked);
      this.updatedTeammate.player.aTalents = playerTalentDetails.aTalents;
      this.updatedTeammate.player.pTalents = playerTalentDetails.pTalents;
      this.updatedTeammate.player.rTalents = playerTalentDetails.rTalents;
      this.updatedTeammate.player.iTalents = playerTalentDetails.iTalents;
      this.updatedTeammate.player.talentPref = playerTalentDetails.talentPref;
      this.updatedTeammate.player.blindSpot = playerTalentDetails.blindSpot;
    }

    this.closePopup();
  }

  computeThinkingTalents(selectedTalents: Skill[]): PlayerTalentDetails {
    let aTalents = 0;
    let iTalents = 0;
    let rTalents = 0;
    let pTalents = 0;
    let talentPref;
    let blindSpot;

    // Thinking talents counter for each type
    selectedTalents.forEach((talent) => {
      switch (talent.type) {
        case 'analytic':
          aTalents++;
          break;
        case 'innovative':
          iTalents++;
          break;
        case 'relational':
          rTalents++;
          break;
        case 'procedural':
          pTalents++;
          break;
        default:
          break;
      }
    });


    // Decision Tree for Brain Preference
    if ((aTalents > 0) && (pTalents > 0) && (rTalents > 0) && (iTalents > 0)) {
      talentPref = 'Whole-Brained';
    } else if ((pTalents === rTalents) && (pTalents === iTalents) && (pTalents > aTalents)) {
      talentPref = 'Limbic (R/P) / Right-Brained';
    } else if ((aTalents === iTalents) && (aTalents === rTalents) && (aTalents > pTalents)) {
      talentPref = 'Cerebral (A/I) / Right-Brained';
    } else if ((aTalents === iTalents) && (aTalents === pTalents) && (aTalents > rTalents)) {
      talentPref = 'Cerebral (A/I) / Left-Brained';
    } else if ((aTalents === pTalents) && (aTalents === rTalents) && (aTalents > iTalents)) {
      talentPref = 'Limbic (R/P) / Left-Brained';
    } else if ((aTalents === iTalents) && (aTalents > pTalents) && (aTalents > rTalents)) {
      talentPref = 'Cerebral (A/I)';
    } else if ((aTalents === pTalents) && (aTalents > iTalents) && (aTalents > rTalents)) {
      talentPref = 'Left-Brained';
    } else if ((pTalents === rTalents) && (pTalents > aTalents) && (pTalents > iTalents)) {
      talentPref = 'Limbic (R/P)';
    } else if ((rTalents === iTalents) && (rTalents > aTalents) && (rTalents > pTalents)) {
      talentPref = 'Right-Brained';
    } else if ((aTalents === rTalents) && (aTalents > iTalents) && (aTalents > pTalents)) {
      talentPref = 'Facts vs. Feelings (A/R)';
    } else if ((iTalents === pTalents) && (iTalents > aTalents) && (iTalents > rTalents)) {
      talentPref = 'Entrepreneur (I/P)';
    } else if ((aTalents > pTalents) && (aTalents > rTalents) && (aTalents > iTalents)) {
      talentPref = 'Analytical';
    } else if ((pTalents > aTalents) && (pTalents > rTalents) && (pTalents > iTalents)) {
      talentPref = 'Procedural';
    } else if ((rTalents > aTalents) && (rTalents > pTalents) && (rTalents > iTalents)) {
      talentPref = 'Relational';
    } else if ((iTalents > aTalents) && (iTalents > rTalents) && (iTalents > pTalents)) {
      talentPref = 'Innovative';
    }


    // Decision Tree for Blind Spot
    if (aTalents > 0 && iTalents > 0 && rTalents > 0 && pTalents > 0) {
      blindSpot = 'None (Whole-Brained)';
    } else if (aTalents === 0 && iTalents > 0 && rTalents > 0 && pTalents > 0) {
      blindSpot = 'Analytical';
    } else if (aTalents > 0 && iTalents > 0 && rTalents > 0 && pTalents === 0) {
      blindSpot = 'Procedural';
    } else if (aTalents > 0 && iTalents > 0 && rTalents === 0 && pTalents > 0) {
      blindSpot = 'Relational';
    } else if (aTalents > 0 && iTalents === 0 && rTalents > 0 && pTalents > 0) {
      blindSpot = 'Innovative';
    } else if ((aTalents === 0) && (iTalents === 0) && (rTalents > 0) && (pTalents > 0)) {
      blindSpot = 'Cerebral (A/I)';
    } else if ((aTalents === 0) && (iTalents > 0) && (rTalents > 0) && (pTalents === 0)) {
      blindSpot = 'Left-Brained';
    } else if ((aTalents > 0) && (iTalents > 0) && (rTalents === 0) && (pTalents === 0)) {
      blindSpot = 'Limbic (R/P)';
    } else if ((aTalents > 0) && (iTalents === 0) && (rTalents === 0) && (pTalents > 0)) {
      blindSpot = 'Right-Brained';
    } else if ((aTalents === 0) && (iTalents > 0) && (rTalents === 0) && (pTalents > 0)) {
      blindSpot = 'Facts vs. Feelings (A/R)';
    } else if ((aTalents > 0) && (iTalents === 0) && (rTalents > 0) && (pTalents === 0)) {
      blindSpot = 'Entrepreneur (I/P)';
    } else if (aTalents > 0 && iTalents === 0 && rTalents === 0 && pTalents === 0) {
      blindSpot = 'Limbic (R/P) / Right-Brained';
    } else if (aTalents === 0 && iTalents === 0 && rTalents === 0 && pTalents > 0) {
      blindSpot = 'Cerebral (A/I) / Right-Brained';
    } else if (aTalents === 0 && iTalents === 0 && rTalents > 0 && pTalents === 0) {
      blindSpot = 'Cerebral (A/I) / Left-Brained';
    } else if (aTalents === 0 && iTalents > 0 && rTalents === 0 && pTalents === 0) {
      blindSpot = 'Limbic (R/P) / Left-Brained';
    }

    return {
      aTalents,
      pTalents,
      rTalents,
      iTalents,
      talentPref,
      blindSpot
    };
  }

  resetData() {
    this.playerName = null;
    this.newPersonForm.reset();
    this.skillsData.forEach(skill => skill.checked = false);
  }

  closePopup() {
    this.skillsPopupEmitter.emit(false);
  }
}
