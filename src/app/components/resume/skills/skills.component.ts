import { Component, OnInit } from '@angular/core';
import {SkillsService} from 'src/app/services/resume/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills;

  constructor(private skillsService : SkillsService) {
    skillsService.getSkills().then(data => {
      this.skills = data;
    })
   }

  ngOnInit(): void {
  }
  

}
