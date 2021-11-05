import {TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import * as Rx from 'rxjs';
import {Observable} from 'rxjs';
import {CustomerService} from "./customer.service";
import {CountryService} from "./country.service";

describe('Country Service Tests', () => {

  let countryService: CountryService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [CustomerService, HttpClient]
    }).compileComponents();
    countryService = TestBed.inject(CountryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should test that countryService created', () => {
    expect(countryService).toBeTruthy();
  });

  it('should return customers when getCountries is called', () => {
    let mockedCountries: Observable<any> = Rx.of([{
      countryCode: "258",
      countryName: "Edunildo Gomes Alberto "
    }]);
    let filteredCustomer = spyOn(httpClient,"get").and.callFake(() => {
      return mockedCountries;
    });
    expect(countryService.getCountries()).toEqual(mockedCountries);
  });

});
