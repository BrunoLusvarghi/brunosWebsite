import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(private httpClient : HttpClient) { }

  //Returns all countries data in current the date
  getCountriesData (){
    return this.httpClient.get("https://corona-api.com/countries");
  }

  //Returns all data from one country (Search by country code)
  getCountryData(code : string){
    return this.httpClient.get("https://corona-api.com/countries/" + code);
  }
}
