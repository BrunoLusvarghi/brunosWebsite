import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(private httpClient : HttpClient) { }

  //Returns all countries data in current the date
  getCountriesData () : Observable<CountryData>{
    return this.httpClient.get<CountryData>("https://corona-api.com/countries");
  }

  //Returns all countries data in current the date
  getCountriesDataWithTimeline (): Observable<CountryData>{
    return this.httpClient.get<CountryData>("https://corona-api.com/countries?include=timeline");
    
  }

  //Returns all data from one country (Search by country code)
  getCountryData(code : string){
    return this.httpClient.get("https://corona-api.com/countries/" + code);
  }
}

export interface CountryData{
  name : string;
  code : string;
  timeline :{
    new_deaths : number;
    new_confirmed : number;
    date : Date;
  }
}