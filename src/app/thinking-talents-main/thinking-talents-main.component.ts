import {Component, OnInit} from '@angular/core';
import {skillsData} from '../../entities/skillsData';
import {Skill} from '../../entities/Skill';

@Component({
  selector: 'app-thinking-talents-main',
  templateUrl: './thinking-talents-main.component.html',
  styleUrls: ['./thinking-talents-main.component.scss']
})
export class ThinkingTalentsMainComponent implements OnInit {
  skillsData: Skill[] = skillsData;
  toggleSkills = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSkillsPopup(activated: boolean) {
    this.toggleSkills = activated;
  }

}
