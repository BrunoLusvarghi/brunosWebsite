import { Injectable } from '@angular/core';
import { CovidDataService } from './covid-data.service';
import { Country } from '../components/charts/charts.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  covidData: any;
  covidDataChange: Subject<any> = new Subject<any>();
  sampleData = [];
  sampleDataChange: Subject<any> = new Subject<any>();
  

  selectedCountries: Country[] = [];
  selectedCountriesChange: Subject<Country[]> = new Subject<Country[]>();
  setSelectedCountries(countriesSelected : Country[]){
    this.selectedCountries = countriesSelected;
  }

  isLoaded: boolean;
  isLoadedChange: Subject<boolean> = new Subject<boolean>();

  chartSelector: string = "confirmed";
  chartSelectorChange: Subject<string> = new Subject<string>();
  setChartType(chartType : string){
    this.chartSelector = chartType;
  }


  chartDatasets: Array<any> = [];
  chartDatasetsChange: Subject<Array<any>> = new Subject<Array<any>>();

  chartLabels: Array<any> = [];
  chartLabelsChange: Subject<Array<any>> = new Subject<Array<any>>();

  chartColors: Array<any> = [];
  chartColorsChange: Subject<Array<any>> = new Subject<Array<any>>();

  chartOptions: any = {
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


    


    this.covidDataChange.subscribe((value) => {
      this.covidData = value
    });

    this.sampleDataChange.subscribe((value) => {
      this.sampleData = value
    });

    
    this.selectedCountriesChange.subscribe((value) => {
      this.selectedCountries = value
    });
  
    
    this.isLoadedChange.subscribe((value) => {
      this.isLoaded = value
    });
  
    
    this.chartSelectorChange.subscribe((value) => {
      this.chartSelector = value
    });
  
  
    
    this.chartDatasetsChange.subscribe((value) => {
      this.chartDatasets = value
    });
  
    
    this.chartLabelsChange.subscribe((value) => {
      this.chartLabels = value
    });
  
    
    this.chartColorsChange.subscribe((value) => {
      this.chartColors = value
    });

    this.covidDataService.getCountriesData().subscribe((res: any) => {
      this.covidData = res.data;
      this.isLoaded = true;
      console.log(this.covidData);
    });

  }


  loadChartData(chartSelector) {

    this.chartDatasets = [];

    this.chartLabels = [];

    this.chartColors = [];
    this.sampleData = [];
    switch (chartSelector) {
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

      console.log(this.covidData);
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
