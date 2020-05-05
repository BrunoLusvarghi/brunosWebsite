import { Component } from '@angular/core';
import { CovidDataService } from '../../services/covid-data.service';
import { takeUntil, share } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { ChartService } from 'src/app/services/chart.service';





@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  
  chartSelector : string;
  ngOnInit() {

  }


  constructor(private chartService : ChartService) {
   
   this.chartSelector = this.chartService.chartSelector;
  }
  changeChart(chartType){
    this.chartService.setChartType(chartType);
  }

  getIsLoaded(): boolean {
    return this.chartService.isLoaded;
}
 
}



export interface Country {
  name: string;
  code : string;
  today : {
    deaths : Number;
    confirmed : Number;
  }
}