import { Component, OnInit } from '@angular/core';
import {CareerHistoryService} from 'src/app/services/resume/career-history.service';

@Component({
  selector: 'app-career-history',
  templateUrl: './career-history.component.html',
  styleUrls: ['./career-history.component.css']
})
export class CareerHistoryComponent implements OnInit {

  careerHistory;

  constructor(private careerService : CareerHistoryService ) {
    careerService.getCarrerHistory().then(data => {
      this.careerHistory = data;
    });
   }

  ngOnInit(): void {
  }

}
