import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationHistoryService {

  education = [{
    degree: 'Post Graduate Certificate',
    institution : 'Seneca College',
    location: 'Toronto/ON, Canada',
    fieldOfStudy: 'Computer Science',
    completed: 'April/2020',
    src:"/assets/images/logo_seneca.svg"
  },{
    degree: 'Bachelor\'s Degree',
    institution : 'Centro Universitario FEI',
    location: 'Sao Paulo, Brazil',
    fieldOfStudy: 'Computer Science',
    completed: 'Jun/2018',
    src:"/assets/images/logo_fei.svg"
  }]

  constructor() { }

  getEducationHistory(){
    return new Promise((resolve,reject) => {
      resolve(this.education);
    });
  }
}
