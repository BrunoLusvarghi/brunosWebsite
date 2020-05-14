import { Component, OnInit, Input } from '@angular/core';
import {Country, ChartsComponent} from '../charts.component';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

  covidData: Country[];
  

  sampleData = [];
  selectedCountries : Country[] = [];


  
  public chartType: string = 'horizontalBar';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [];
  public chartOptions: any ;
 

  constructor(private chartService : ChartService) { 
    
    this.chartOptions = chartService.chartOptions;
    this.chartService.loadHorizontalBarChartData();
  }

  ngOnInit(): void {
    

  }

  //Returns the chart data from Chart Service; Values is updated when a change is identified
  getChartDatasets(){ return this.chartService.chartDatasets;}

  //Returns the chart labels from Chart Service; Values is updated when a change is identified
  getChartLabels(){return this.chartService.chartLabels;}

  //Returns the chart colors from Chart Service; Values is updated when a change is identified
  getChartColors() {return this.chartService.chartColors;}


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}


