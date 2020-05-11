import { Component, OnInit } from '@angular/core';
import {faBusinessTime, faLaptopCode, faUniversity,faMugHot} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  faBusinessTime = faBusinessTime;
  faLaptopCode = faLaptopCode;
  faUniversity = faUniversity;
  faMugHot = faMugHot; 
  panelSelector = 'aboutMe';
  
  
  constructor() {
    
   }

  ngOnInit(): void {
  }

  selectPanel(panel){
    this.panelSelector = panel;
  }
}
