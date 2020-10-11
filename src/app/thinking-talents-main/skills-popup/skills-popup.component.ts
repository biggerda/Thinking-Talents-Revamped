import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {skillsData} from '../../../entities/skillsData';
import {Skill} from '../../../entities/Skill';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Player} from '../../../entities/Player';

@Component({
  selector: 'app-skills-popup',
  templateUrl: './skills-popup.component.html',
  styleUrls: ['./skills-popup.component.scss']
})

export class SkillsPopupComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  private _clickedInside = true;
  newTeammate: Player;
  newPersonName: FormGroup;

  @Output()
  skillsPopupEmitter = new EventEmitter<boolean>();

  @Output()
  newTeammateEmitter = new EventEmitter<Player>();

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
    this.newPersonName = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
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

    this.newTeammate = {
      name: customerName,
      talents: selectedTalents
    };

    this.newTeammateEmitter.emit(this.newTeammate);

    this.closePopup();
    this.reset();
  }

  reset() {
    this.newPersonName.reset();
    this.skillsData.forEach(skill => skill.checked = false);
  }

  closePopup() {
    this.skillsPopupEmitter.emit(false);
  }
}
