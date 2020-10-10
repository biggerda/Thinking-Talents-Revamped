import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {skillsData} from '../../../entities/skillsData';
import {Skill} from '../../../entities/Skill';

@Component({
  selector: 'app-skills-popup',
  templateUrl: './skills-popup.component.html',
  styleUrls: ['./skills-popup.component.scss']
})
export class SkillsPopupComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  selectedTalents: string[] = [];
  private _clickedInside = true;

  @Output()
  skillsPopupEmitter = new EventEmitter<boolean>();

  @HostListener('click')
  clickInsideElement() {
    this._clickedInside = true;
  }

  @HostListener('document:click')
  clickAction() {
    if ( !this._clickedInside ){
      this.closePopup();
    }
    this._clickedInside = false;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.skillsPopupEmitter.emit(false);
  }

  selectTalent(talent: string) {
    if (!this.selectedTalents.includes(talent)) {
      this.selectedTalents.push(talent);
    }
    console.log(this.selectedTalents);
  }

  createNewTeammate() {
    // Only call this method if name and at least 4 thinking talents have been entered
    // Creates new teammate with a name and thinking talent list
    // Adds name back to the team chart once completed
  }
}
