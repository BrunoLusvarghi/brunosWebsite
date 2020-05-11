import { Component, OnInit } from '@angular/core';
import {EducationHistoryService} from 'src/app/services/resume/education-history.service';

@Component({
  selector: 'app-education-history',
  templateUrl: './education-history.component.html',
  styleUrls: ['./education-history.component.css']
})
export class EducationHistoryComponent implements OnInit {

  educationHistory;
  constructor(private educationService : EducationHistoryService) {
    educationService.getEducationHistory().then(data => {
      this.educationHistory = data;
    });
   }

  ngOnInit(): void {
  }

}
