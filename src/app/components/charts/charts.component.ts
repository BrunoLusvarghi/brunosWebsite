import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CovidDialogComponent} from '../dialog/covid-dialog/covid-dialog.component';





@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {


  panelOpenState = false;
  chartSelector: string;
  ngOnInit() {

  }


  constructor(private chartService: ChartService,public dialog: MatDialog) {

    const dialogRef = this.dialog.open(CovidDialogComponent, {
      width: '500px' 
    });

    

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
      
    // });
    this.chartSelector = this.chartService.chartSelector;
  }

  

  getChartSelector() { console.log(this.chartService.chartSelector);this.chartSelector = this.chartService.chartSelector;}
  setChartSelector(chartType){this.chartService.setChartType(chartType);this.chartSelector = chartType};

  getIsLoaded(): boolean {
    return this.chartService.isLoaded;
  }

  getSelectedCountriesCount(){ return this.chartService.selectedCountries != null ? this.chartService.selectedCountries.length : 0;};

 

}



export interface Country {
  name: string;
  code: string;
  today: {
    deaths: Number;
    confirmed: Number;
  }
}