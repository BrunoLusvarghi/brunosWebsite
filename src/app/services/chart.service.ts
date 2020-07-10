import { Injectable, ɵConsole } from '@angular/core';
import { CovidDataService } from './portfolio/covid-data.service';
import { Country } from '../components/charts/charts.component';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  date: Date = new Date();
  dateChange: Subject<Date> = new Subject<Date>();

  setDate(dt: Date) {
    this.date = dt;
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
  getDate() { return this.date; }
  getStringDate() { return (this.date == null || this.date == undefined) ? null : this.date.toLocaleDateString('en-Us') }


  dataAvailable = true;

  //Color pallet with distinct color to generate chart colors
  colors = [
    { r: 255, g: 0, b: 0 }, { r: 0, g: 234, b: 255 }, { r: 170, g: 0, b: 255 }, { r: 255, g: 127, b: 0 }, { r: 191, g: 255, b: 0 },
    { r: 0, g: 149, b: 255 }, { r: 255, g: 0, b: 170 }, { r: 255, g: 212, b: 0 }, { r: 106, g: 255, b: 0 }, { r: 0, g: 64, b: 255 }
  ]
  //Idx of which color will be used to draw a country data
  colorIdx = 0;

  covidData: any;
  covidDataChange: Subject<any> = new Subject<any>();
  sampleData = [];
  sampleDataChange: Subject<any> = new Subject<any>();


  //Update the list of selected countries
  selectedCountries: any = [];
  selectedCountriesChange: Subject<any> = new Subject<any>();
  setSelectedCountries(countriesSelected: any) {
    this.selectedCountries = countriesSelected;
  }


  isLoaded: boolean;
  isLoadedChange: Subject<boolean> = new Subject<boolean>();

  //Selects which info type will be shown
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

  //Sets chart configuration options
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

    this.date.setHours(0, 0, 0, 0);

    /*
      All components that uses dependency injection to reference Chart Service, have access to the below variables and any changes
      made to it
    */
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

    this.dateChange.subscribe((value) => {
      this.date = value
    });

    //Gets covid Data with date history (timeline)
    this.covidDataService.getCountriesDataWithTimeline().subscribe((res: any) => {
      this.covidData = res.data;
      this.isLoaded = true;

    });

  }


  //Loads the Horizontal Bar Chart 
  loadHorizontalBarChartData() {

    this.dataAvailable = true;

    this.chartDatasets = [];

    this.chartLabels = [];

    this.chartColors = [];
    this.sampleData = [];
    


    let countriesAdded = 0;

    switch (this.chartSelector) {

      //Loads Deaths quantity information
      case 'deaths':


        /*
          Sorts all data based on number of deaths yesterday    
          Yesterday date is used as a more trusthworthy situation about a country,
          since today's information is still being counted and can show incosistencies
        */
        this.covidData.sort(compareYesterdayDeaths);


        //Get data from the countries with more deaths on the selected date
        for (let i = 0; countriesAdded <= 10 && this.covidData.length > i; i++) {


          console.log(this.date);
          let countryTimeLine = this.covidData[i].timeline.find(o => o.date != null
            && o.date === this.date.toISOString().slice(0, 10));


          //if a country timeline doesn't show information from that specific date, the country is not shown in that date chart
          if (countryTimeLine == undefined || countryTimeLine == null) {
            continue;
          }

          let timelineIdx = this.covidData[i].timeline.indexOf(countryTimeLine);

          //get date timeline idx for future references
          this.covidData[i].timelineIdx = timelineIdx;

          this.sampleData.push(this.covidData[i]);

          countriesAdded++;
        }

        //Sort the 10 countries selected
        this.sampleData.sort(compareTimelineNewDeaths);

        
        if (this.sampleData.length == 0) {
          this.dataAvailable = false;
        }
        //Loads chart labels
        this.chartDatasets.push({
          data: this.sampleData.map(x => x.timeline[x.timelineIdx].new_deaths), label: 'Deaths'
        })

        //Loads chart labels
        this.chartLabels = this.sampleData.map(x => x.name);

        break;

      case 'confirmed':

        /*
          Sorts all data based on number of confirmed yesterday    
          Yesterday date is used as a more trusthworthy situation about a country,
          since today's information is still being counted and can show incosistencies
        */
        this.covidData.sort(compareYesterdayConfirmedCases);


        //Get data from the countries with more deaths on the selected date
        for (let i = 0; countriesAdded <= 10 && this.covidData.length > i; i++) {


          console.log(this.date);
          let countryTimeLine = this.covidData[i].timeline.find(o => o.date != null
            && o.date === this.date.toISOString().slice(0, 10));



          if (countryTimeLine == undefined || countryTimeLine == null) {
            continue;
          }

          let timelineIdx = this.covidData[i].timeline.indexOf(countryTimeLine);

          this.covidData[i].timelineIdx = timelineIdx;

          this.sampleData.push(this.covidData[i]);

          countriesAdded++;
        }

        this.sampleData.sort(compareTimelineNewConfirmed);


        if (this.sampleData.length == 0) {
          this.dataAvailable = false;
        }
        //Loads chart labels
        this.chartDatasets.push({
          data: this.sampleData.map(x => x.timeline[x.timelineIdx].new_confirmed), label: 'Confirmed'
        })

        //Loads chart labels
        this.chartLabels = this.sampleData.map(x => x.name);

        break;


    }

    this.generateHorizontalChartColors();
  }


  //Loads the Horizontal Bar Chart 
  loadLineChartData(countryData) {

    this.dataAvailable = true;
    //Gets data from a country 10 last days
    console.log(countryData.timeline);
    let data = countryData.timeline.slice(1, 10).reverse().map(x => (this.chartSelector == 'deaths') ? x.deaths : x.confirmed);

    //Loads data to chart
    this.chartDatasets.push({ data: data, label: countryData.name });

    //Loads chart labels  
    this.chartLabels = this.loadChartLabels(countryData);


    this.generateLineChartColors();

  }

  loadChartLabels(countryData) {
    return countryData.timeline.slice(1, 10).reverse().map(x => x.date);
  }


  //Generate the colors presented in the Horizontal Chart 
  generateHorizontalChartColors() {

    let colorsArray = [];

    this.chartLabels.forEach(element => {

      let color = this.getRgbColor();
      colorsArray.push('rgba(' + color.r + ',' + color.g + ',' + color.b + ', .7)');


    });


    this.chartColors.push({
      backgroundColor: colorsArray,
      hoverBackgroundColor: colorsArray,
      borderColor: 'rgba(0,0,0, .4)',
      borderWidth: 2,
    })
  }


  //Generate the colors presented in the Horizontal Chart 
  generateLineChartColors() {


    let color = this.getRgbColor();

    this.chartColors.push({

      borderColor: 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)',
      borderWidth: 4
    })


  }

  //Selects which color will be used based on the colorIdx variable
  getRgbColor() {

    let color = this.colors[this.colorIdx];
    if (this.colorIdx + 1 == this.colors.length)
      this.colorIdx = 0;
    else this.colorIdx++;


    return color;
  }

  //Adds the selected country to the chart
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

  //Removes country from chart
  removeSelectedCountry(countryCode: string) {

    let country = this.selectedCountries.find(obj => {
      return obj.code == countryCode;
    })


    if (country != undefined) {
      let idx = this.selectedCountries.indexOf(country);

      this.chartDatasets.splice(idx, 1)
      this.chartColors.splice(idx, 1);
      this.selectedCountries.splice(idx, 1);
      this.chartLabels = this.loadChartLabels(country);

    }

  }
}


//Compare countries by quantity of cases confirmed today
function compareCasesConfirmed(a, b) {
  if (a.today.confirmed > b.today.confirmed) return -1;
  if (b.today.confirmed > a.today.confirmed) return 1;

  return 0;
}

//Compare countries by quantity of deaths today
function compareDeaths(a, b) {
  if (a.today.deaths > b.today.deaths) return -1;
  if (b.today.deaths > a.today.deaths) return 1;

  return 0;
}

//Compare countries by quantity of deaths today
function compareTimelineNewDeaths(a, b) {
  if (a.timeline[a.timelineIdx].new_deaths > b.timeline[b.timelineIdx].new_deaths) return -1;
  if (b.timeline[b.timelineIdx].new_deaths > a.timeline[a.timelineIdx].new_deaths) return 1;

  return 0;
}

//Compare countries by quantity of deaths today
function compareTimelineNewConfirmed(a, b) {
  if (a.timeline[a.timelineIdx].new_confirmed > b.timeline[b.timelineIdx].new_confirmed) return -1;
  if (b.timeline[b.timelineIdx].new_confirmed > a.timeline[a.timelineIdx].new_confirmed) return 1;

  return 0;
}

//Compare dates 
function compareTimelineDates(a, b) {
  if (b.date > b.date) return -1;
  if (a.date > a.date) return 1;

  return 0;
}


/*
Compare yesterday cases to sort data by currently most affected countries
This removes errors from today's date changes and reduces the complexity of sorting algorithm
*/

function compareYesterdayConfirmedCases(a, b) {


  if (a.timeline.length < 2) {
    if (b.timeline.length < 2)
      return 0;
    else
      return 1;
  }

  `  `

  if (b.timeline.length < 2) {
    return -1;
  }




  if (b.timeline[1].new_confirmed > a.timeline[1].new_confirmed) return 1;
  if (a.timeline[1].new_confirmed > b.timeline[1].new_confirmed) return -1;

  return 0;
}


/*
Compare yesterday cases to sort data by currently most affected countries
This removes errors from today's date changes and reduces the complexity of sorting algorithm
*/

function compareYesterdayDeaths(a, b) {


  if (a.timeline.length < 2) {
    if (b.timeline.length < 2)
      return 0;
    else
      return 1;
  }

  `  `

  if (b.timeline.length < 2) {
    return -1;
  }


  if (b.timeline[0].new_deaths > a.timeline[0].new_deaths) return 1;
  if (a.timeline[0].new_deaths > b.timeline[0].new_deaths) return -1;

  return 0;
}