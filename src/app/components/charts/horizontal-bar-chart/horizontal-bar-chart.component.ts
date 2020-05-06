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
    this.covidData = chartService.covidData;  
    
    this.chartOptions = chartService.chartOptions;
    this.chartService.loadHorizontalBarChartData();
  }

  ngOnInit(): void {
    

  }

  getChartDatasets(){ return this.chartService.chartDatasets;}
  getChartLabels(){return this.chartService.chartLabels;}
  getChartColors() {return this.chartService.chartColors;}


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}


