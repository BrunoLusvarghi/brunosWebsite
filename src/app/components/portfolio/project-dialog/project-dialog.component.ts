import { Component, OnInit, Input } from '@angular/core';
import { project } from 'src/app/services/portfolio/portfolio.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
project :any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.project  = data;
   }

  ngOnInit(): void {
  }

}
