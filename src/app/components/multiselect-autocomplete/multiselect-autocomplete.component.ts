import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { CovidDataService } from '../../services/portfolio/covid-data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Country } from '../charts/charts.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.css']
})
export class MultiselectAutocompleteComponent implements OnInit {

  myControl;
  @ViewChild('input') input: ElementRef; 
  
   countries: Country[];
  
  selectedCountries: any = [];

  filteredOptions: Observable<Country>;

  constructor(private chartService : ChartService) {

    this.countries = chartService.covidData;
    this.myControl = new FormControl('');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: any) => name ? this._filter(name) : this.countries.slice())
      );
  }


  ngOnInit() {
 
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getSelectedCountries(){return this.chartService.selectedCountries;}

  add(country : Country): void {

      this.chartService.addSelectedCountry(country);

      this.input.nativeElement.value = '';


  }

  remove(country : Country): void {
    
    this.chartService.removeSelectedCountry(country.code);
    

  }


}


