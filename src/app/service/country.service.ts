import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/countries');
  }

}
