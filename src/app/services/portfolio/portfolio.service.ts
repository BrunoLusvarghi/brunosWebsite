import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  projects : Array<project> = [];
  constructor() {
    this.projects.push(
      {
        projectName: 'My Website',        
        technologies : ['Angular','Html','CSS','Bootstrap','Angular Material','Node.js'],
        description : 'Project created to be my virtual Resume/Portfolio. I am costantly modifying the website\n'
        +' and adding new features',
        url: 'http://bruno-dev.com',
        repository : 'https://github.com/BrunoLusvarghi/brunosWebsite'
      },
      {
        projectName: 'Covid-19',
        subtitle: 'COVID-19 information', 
        technologies : ['Angular','Html','CSS','chart.js','Angular Material','HttpClient','Node.js'],
        description : 'Project to bring awareness about the COVID-19 situation around the world. Navigate through the filters to see \n'
        + 'the COVID situation in a specific date or select some countries to compare data and situation',
        url: 'http://bruno-dev.com/covid19Info',
        repository : 'https://github.com/BrunoLusvarghi/brunosWebsite/tree/master/src/app/components/covid'
      },
      {
        projectName: 'Sensing Change ',
        subtitle: 'Bachelor Degree Capstone Project',
        technologies : ['Node.js','Raspberry PI 3','Raspbian'],
        description : 'This project was created with 3 more students as the Capstone Project of our Bachelor Degree in Computer Science.\n'
        +'The project target creating a monitoring probe for small farmers with affordable components. Soil/Air temperature and humidity' 
        +' is measured and sent to API.\n' 
        +'The coding part was done by me, while mu colleagues focused on the documentation and hardware of the monitoring probe.',
        repository : 'https://github.com/BrunoLusvarghi/brunosWebsite/tree/master/src/app/components/covid'
      }

    )
   }

   getProjects(){
     return this.projects;
   }

}

export interface project{
  projectName : string;
  subtitle? : string;
  technologies: Array<string>,
  url?: string,
  description: string
  images?: Array<string>,
  repository : string
}