import {Component, EventEmitter, OnInit} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  private _toggleSkillsPopup = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  openSkillsPopup(activated: boolean) {
    this._toggleSkillsPopup = activated;
  }

}
