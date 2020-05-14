import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../charts.component';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() covidData: Country[];
  
  sampleData = [];
  selectedCountries : Country[] = [];


  
  public chartType: string = 'line';
  
  public chartOptions: any;


  constructor(private chartService : ChartService) { 
    
    //Loads Chart configurations
    this.chartOptions = chartService.chartOptions;
    
  }


  ngOnInit(): void {
    
  }

  //Returns the chart data from Chart Service; Values is updated when a change is identified
  getChartDatasets(){ return this.chartService.chartDatasets;}

  //Returns the chart labels from Chart Service; Values is updated when a change is identified
  getChartLabels(){return this.chartService.chartLabels;}

  //Returns the chart colors from Chart Service; Values is updated when a change is identified
  getChartColors() {return this.chartService.chartColors;}




  public chartClicked(e: any): void { 
    
  }
  public chartHovered(e: any): void {
    
   }

}



