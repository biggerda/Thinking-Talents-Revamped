import {Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {skillsData} from '../../../entities/skillsData';
import {Skill} from '../../../entities/Skill';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Player} from '../../../entities/Player';
import {UpdatedPlayerData} from '../../../entities/UpdatedPlayerData';

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
    const selectedTalents = this.listSelectedTalents();
    // const selectedTalentsNames = selectedTalents.map(skill => skill.name);

    if (this.isAddingTeammate) {
      this.newTeammate = {
        name: customerName,
        talents: selectedTalents
      };
      this.addTeammatetoChartEmitter.emit(this.newTeammate);
    } else {
      this.updatedTeammate.player.name = customerName;
      this.updatedTeammate.player.talents = this.skillsData.filter(it => it.checked);
      this.updateTeammateOnChartEmitter.emit(this.updatedTeammate);
    }

    this.closePopup();
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
