import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-covid-dialog',
  templateUrl: './covid-dialog.component.html',
  styleUrls: ['./covid-dialog.component.css']
})
export class CovidDialogComponent implements OnInit {


  
  constructor(
    public dialogRef: MatDialogRef<CovidDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  ngOnInit(): void {
  }

}
