import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../charts.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() covidData: Country[];
  

  sampleData = [];
  selectedCountries : Country[] = [];


  public chartSelector = "confirmed";
  public chartType: string = 'lineBar';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [];
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

  constructor() { }

  ngOnInit(): void {
  }







  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
