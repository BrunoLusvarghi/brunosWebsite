import { Component } from '@angular/core';
import { CovidDataService } from '../../services/covid-data.service';

import {Observable} from 'rxjs';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {


  countries : Countries[];

  ngOnInit() {

    
  }

  
  covidData = [];
  sampleData = [];

  public chartSelector = "confirmed";
  public chartType: string = 'horizontalBar';

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

  constructor(private covidDataService: CovidDataService) {
    this.covidDataService.getCountriesData().subscribe((data: any) => {
      this.covidData = [];
      this.sampleData = [];
      this.covidData = data.data;

      

      this.loadChartData();
    })
  }

  changeChart(chart) {
    this.chartSelector = chart;

    this.loadChartData();
  }


  loadChartData() {

    this.chartDatasets = [];

    this.chartLabels = [];

    this.chartColors = [];
    this.sampleData = [];
    switch (this.chartSelector) {
      case 'deaths':

        this.covidData.sort(compareDeaths);

        for (let i = 0; i < 30 && this.covidData.length > i; i++) {
          this.sampleData.push(this.covidData[i]);
        }

        this.chartDatasets.push({
          data: this.sampleData.map(x => x.today.deaths), label: 'Deaths (last 24 hours)'
        })


        this.chartLabels = this.sampleData.map(x => x.name);


        this.generateChartColors();

        break;

      case 'confirmed':
        this.covidData.sort(compareCasesConfirmed);

        for (let i = 0; i < 10 && this.covidData.length > i; i++) {
          this.sampleData.push(this.covidData[i]);
        }

        this.chartDatasets.push({
          data: this.sampleData.map(x => x.today.confirmed), label: 'New cases (last 24 hours)'
        });


        this.chartLabels = this.sampleData.map(x => x.name);


        this.generateChartColors();
    }
  }





  generateChartColors() {


    let colorsArray = [];

    let idx = 1;
    this.chartLabels.forEach(element => {
      let randomValue = 255 * (Math.random());
      let r = 0;
      let g = 0;
      let b = 0;


      switch (idx) {
        case 1:
          r = 255;
          if (Math.random() < 0.5)
            b = randomValue;
          else g = randomValue

          break;
        case 2:
          g = 255;
          if (Math.random() < 0.5)
            r = randomValue;
          else b = randomValue

          break;
        case 3:
          b = 255;
          if (Math.random() < 0.5)
            g = randomValue;
          else r = randomValue

          break;
      }



      colorsArray.push('rgba(' + r + ',' + g + ',' + b + ', .7)');

      if (idx < 3) idx++;
      else idx = 1;

    });

    this.chartColors.push({
      backgroundColor: colorsArray,
      hoverBackgroundColor: colorsArray,
      borderColor: 'rgba(0,0,0, .4)',
      borderWidth: 2,
    })

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

export interface Countries {
  name: string;
  code : string;
}