import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CountryInterface } from '../types/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get<CountryInterface[]>(environment.COUNTRY.ALL)
  }

  getCountryByName(countryName: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.NAME}${countryName}`)
  }


  getCountryByCapitalCity(capitalCity: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.CAPITAL_CITY}${capitalCity}`)
  }


}
