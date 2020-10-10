import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {skillsData} from '../../../entities/skillsData';
import {Skill} from '../../../entities/Skill';

@Component({
  selector: 'app-skills-popup',
  templateUrl: './skills-popup.component.html',
  styleUrls: ['./skills-popup.component.scss']
})
export class SkillsPopupComponent implements OnInit {
  @Output() skillsPopupEmitter = new EventEmitter<boolean>();

  skillsData: Skill[] = skillsData;

  constructor() {
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.skillsPopupEmitter.emit(false);
  }
}
