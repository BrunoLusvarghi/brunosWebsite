import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skils = [{
    skill: 'C#',
    knowledge: 'Advanced',
    yearsOfExperience: 5
    },
    {
      skill: 'Angular 2+',
      knowledge: 'Intermediate',
      yearsOfExperience: 1
    },
    {
      skill: 'HTML, CSS and JS',
      knowledge: 'Intermediate',
      yearsOfExperience: 3
    },
    {
      skill: 'Jquery',
      knowledge: 'Intermediate',
      yearsOfExperience: 3
    },
    {
      skill: 'TSQL',
      knowledge: 'Intermediate',
      yearsOfExperience: 3
    },
    {
      skill: 'SqlServer',
      knowledge: 'Intermediate',
      yearsOfExperience: 3
    },
    {
      skill: 'Selenium',
      knowledge: 'Intermediate',
      yearsOfExperience: 2
    },
    {
      skill: 'MySql',
      knowledge: 'Beginner',
      yearsOfExperience: 1
    },
    {
      skill: 'Linux',
      knowledge: 'Beginner',
      yearsOfExperience: 2
    },
    {
      skill: 'Automation Anywhere',
      knowledge: 'Beginner',
      yearsOfExperience: 1
    }]

  constructor() { }

  getSkills(){
    return new Promise((resolve,reject) => {
      resolve(this.skils);
    });
  }
}
