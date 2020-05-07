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
  
  JSON;
  sampleData = [];
  selectedCountries : Country[] = [];


  
  public chartType: string = 'line';
  
  public chartOptions: any = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 15,
        }
      }
    }
  };

  constructor(private chartService : ChartService) { 
    this.JSON = JSON;
    
    
    this.chartOptions = chartService.chartOptions;
    
  }


  ngOnInit(): void {
    
  }

  getChartDatasets(){ return this.chartService.chartDatasets;}
  getChartLabels(){return this.chartService.chartLabels;}
  getChartColors() {return this.chartService.chartColors;}




  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}



