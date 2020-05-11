import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CareerHistoryService {

  constructor() { }

  career = [{
    company: 'Allianz Partners (Brazil)',
    role : 'Software Engineer',
    description: 'Fully Agile Team (Plannings, Dailies, Reviews, etc. Full Stack Web development (Angular 7, .Net WebApi and SQL Server)',
    period : 'April/2019 - September/2019'
  },{
    company: 'Avanade (Brazil)',
    role : 'Software Engineer',
    description: 'Work in small teams sharing information, helping each other and dividing workload to achieve deadlines. Full Stack Web development (MVC Architecture, Razor and SQL Server)' +
    'Robot Process Automation (Automation Anywhere and Selenium). Implemented solutions that helped the client by automating daily tasks',
    period : 'October/2017 – April/2019'
  },{
    company: 'Cognizant (Brazil)',
    role : 'Software Engineer',
    description: 'Estimate development hours based on requirement document. Delivered big and complex project on time working with a small team. Full Stack Web development (MVC Architecture, Razor and SQL Server).',
    period : ' December/2016 – October/2017'
  },{
    company: 'AR Sistemas (Brazil)',
    role : 'Software Engineer',
    description: ' Lead small help desk team responsible for maintaining the software developed by me. Windows Forms application with MySql Database',
    period : 'January/2015 – December/2016'
  }]

  getCarrerHistory(){
    return new Promise((resolve,reject) => {
      resolve(this.career);
  });

}
}
