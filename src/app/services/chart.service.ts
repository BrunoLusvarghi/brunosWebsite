import { Injectable, ɵConsole } from '@angular/core';
import { CovidDataService } from './covid-data.service';
import { Country } from '../components/charts/charts.component';
import { Subject } from 'rxjs';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  colors = [
    { r: 255, g: 0, b: 0 }, { r: 0, g: 234, b: 255 }, { r: 170, g: 0, b: 255 }, { r: 255, g: 127, b: 0 }, { r: 191, g: 255, b: 0 },
    { r: 0, g: 149, b: 255 }, { r: 255, g: 0, b: 170 }, { r: 255, g: 212, b: 0 }, { r: 106, g: 255, b: 0 }, { r: 0, g: 64, b: 255 }, { r: 237, g: 185, b: 185 },
    { r: 185, g: 215, b: 237 }, { r: 231, g: 233, b: 185 }, { r: 220, g: 185, b: 237 }, { r: 185, g: 237, b: 224 }, { r: 143, g: 35, b: 35 }, { r: 35, g: 98, b: 143 },
    { r: 143, g: 106, b: 35 }, { r: 107, g: 35, b: 143 }, { r: 79, g: 143, b: 35 }
  ]
  colorIdx = 0;

  covidData: any;
  covidDataChange: Subject<any> = new Subject<any>();
  sampleData = [];
  sampleDataChange: Subject<any> = new Subject<any>();


  selectedCountries: any = [];
  selectedCountriesChange: Subject<any> = new Subject<any>();
  setSelectedCountries(countriesSelected: any) {
    this.selectedCountries = countriesSelected;
  }

  isLoaded: boolean;
  isLoadedChange: Subject<boolean> = new Subject<boolean>();

  chartSelector: string = "confirmed";
  chartSelectorChange: Subject<string> = new Subject<string>();
  setChartType(chartType: string) {
    this.chartSelector = chartType;

    if (this.selectedCountries.length == 0)
      this.loadHorizontalBarChartData();
    else {
      this.chartDatasets = [];
      this.chartColors = [];
      this.chartLabels = [];
      for (let i = 0; i < this.selectedCountries.length; i++)
        this.loadLineChartData(this.selectedCountries[i]);
    }

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

    });

  }


  loadHorizontalBarChartData() {

    this.chartDatasets = [];

    this.chartLabels = [];

    this.chartColors = [];
    this.sampleData = [];
    switch (this.chartSelector) {
      case 'deaths':

        this.covidData.sort(compareDeaths);

        for (let i = 0; i < 10 && this.covidData.length > i; i++) {
          this.sampleData.push(this.covidData[i]);
        }

        this.chartDatasets.push({
          data: this.sampleData.map(x => x.today.deaths), label: 'Deaths (last 24 hours)'
        })


        this.chartLabels = this.sampleData.map(x => x.name);




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



    }
    this.generateHorizontalChartColors();
  }



  loadLineChartData(countryData) {





    let data = countryData.timeline.slice(1, 10).reverse().map(x => (this.chartSelector == 'deaths') ? x.deaths : x.confirmed);

    this.chartDatasets.push({ data: data, label: countryData.name });


    this.chartLabels = countryData.timeline.slice(1, 10).reverse().map(x => x.date);


    this.generateLineChartColors();

  }



  generateHorizontalChartColors() {


    let colorsArray = [];

    let idx = 1;
    this.chartLabels.forEach(element => {
      let randomValue = 255 * (Math.random());



      let color = this.getRgbColor();
      colorsArray.push('rgba(' + color.r + ',' + color.g + ',' + color.b + ', .7)');

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



  generateLineChartColors() {

    if (this.chartColors.length == 0)
      this.colorIdx = 0;
    let color = this.getRgbColor();

    this.chartColors.push({

      borderColor: 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)',
      borderWidth: 4
    })


  }

  getRgbColor() {
    let color = this.colors[this.colorIdx];
    if (this.colorIdx == this.colors.length + 1)
      this.colorIdx = 0;
    else this.colorIdx++;
    return color;
  }

  addSelectedCountry(country: Country) {

    this.covidDataService.getCountryData(country.code).subscribe((res: any) => {

      let countryData = res.data;
      countryData.timeline = countryData.timeline.sort(compareTimelineDates);


      if (this.selectedCountries.length == 0) {
        this.chartDatasets = [];
        this.chartLabels = [];
        this.chartColors = [];
      }

      this.selectedCountries.push(countryData);



      this.loadLineChartData(countryData);
    });

  }

  removeSelectedCountry(countryCode: string) {
    
    let country = this.selectedCountries.find(obj => {
      return obj.code == countryCode;
    })


    if (country != undefined) {
      let idx = this.selectedCountries.indexOf(country);

      this.chartDatasets.splice(idx,1);
      this.chartColors.splice(idx,1);
      this.selectedCountries.splice(idx,1);

      console.log(this.chartDatasets);
     
    }



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

function compareTimelineDates(a, b) {
  if (b.date > b.date) return -1;
  if (a.date > a.date) return 1;

  return 0;
}
