import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import {SortService} from 'src/app/services/sort.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  progressBarValue = 0;
  testEmitter$ = new BehaviorSubject(0);
  numbers;
  constructor(private httpClient : HttpClient,private sortService : SortService, private ref: ChangeDetectorRef) {
    
    this.httpClient.get("assets/resources/my_file.txt").subscribe(data =>{
      console.log(data);
      this.numbers = (data + '').split(';');
    },
    err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

  sort(){
    this.progressBarValue = 30;
    let arr = [];
  

    this.sortService.runInsertionSort(this.numbers).subscribe({
      next :(x) => { 
        
        this.progressBarValue = x;
        this.ref.detectChanges();
      },
      completed : (x) => {
        this.progressBarValue = 100;
      }
    });
  }

  

}
