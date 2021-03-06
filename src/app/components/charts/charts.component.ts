import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';





@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  //filter panel status
  panelOpenState = false;

  chartSelector: string;

  date : Date;

  ngOnInit() {

  }


  constructor(private chartService: ChartService) {


    
    this.getChartSelector();
  }

  
  //Returns the chart type from Chart Service; Updates value when a change is identified
  getChartSelector() { this.chartSelector = this.chartService.chartSelector;}

  //Sets the chart type from Chart Service
  setChartSelector(chartType){this.chartService.setChartType(chartType);this.chartSelector = chartType};

  //Check if chart was already loaded
  getIsLoaded(): boolean {
    return this.chartService.isLoaded;
  }

  //Checks if there is any country selected to change the chart type 
  getSelectedCountriesCount(){ return this.chartService.selectedCountries != null ? this.chartService.selectedCountries.length : 0;};


  getDate() { return this.chartService.getDate()};
  getStringDate(){return this.chartService.getStringDate()}
  setDate(){this.chartService.setDate(this.date);}
 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.chartService.setDate(event.value);
  }

}



export interface Country {
  name: string;
  code: string;
  today: {
    deaths: Number;
    confirmed: Number;
  }
}