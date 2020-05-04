import { Component, OnInit, Input, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CovidDataService } from '../../services/covid-data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Countries } from '../charts/charts.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.css']
})
export class MultiselectAutocompleteComponent implements OnInit {

  myControl;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @Input() countries: Country[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedCountries: any = [];

  filteredOptions: Observable<Country>;

  constructor() {
    this.countries.forEach(element => {
      console.log(element);
    });
  }


  ngOnInit() {
    this.myControl = new FormControl('');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: any) => name ? this._filter(name) : this.countries.slice())
      );
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {

    
    const value = event.value;
console.log(value);
    // Add our fruit
    if ((value || '').trim()) {

      let idx = this.countries.map(function(e) { return e.code; }).indexOf( value);
      console.log(idx);
      this.selectedCountries.push(this.selectedCountries[idx]);
    }

    this.myControl.setValue("");

  }

  remove(country : Country): void {
    const name = country.name; 
    const code = country.code;

    let idx = this.selectedCountries.indexOf({ code: code, name: name });

    if (idx >= 0) {
      this.selectedCountries.splice(idx, 1);
    }

  }


}


export interface Country {
  name: string;
  code: string;
}

