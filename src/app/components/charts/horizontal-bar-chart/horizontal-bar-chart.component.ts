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
    this.chartDatasets = chartService.chartDatasets;  
    this.chartLabels = chartService.chartLabels;
    this.chartColors = chartService.chartColors;
    this.chartColors = chartService.chartColors;
    this.chartOptions = chartService.chartOptions;
    this.chartService.loadChartData('confirmed');
  }

  ngOnInit(): void {
    

  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}


function compareCasesConfirmed(a, b) {
  if (a.today.confirmed > b.today.confirmed) return -1;
  if (b.today.confirmed > a.today.confirmed) return 1;

  return 0;
}

function compareDeaths(a, b) {
  if (a.today.deaths > b.today.deaths) return -1;
  if (b.today.deaths > a.today.deaths) return 1;

  return 0;
}


