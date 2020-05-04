import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(private httpClient : HttpClient) { }

  getCountriesData (){
    return this.httpClient.get("https://corona-api.com/countries");
  }
}
