import {TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import * as Rx from 'rxjs';
import {Observable} from 'rxjs';
import {CustomerService} from "./customer.service";
import {CustomerFilterDTO} from "../model/customer.filter.dto";

describe('CustomerService Tets', () => {

  let customerService: CustomerService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [CustomerService, HttpClient]
    }).compileComponents();
    customerService = TestBed.inject(CustomerService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should test that customerService created', () => {
    expect(customerService).toBeTruthy();
  });

  it('should return customers when getCustomers is called', () => {
    let mockedCustomers: Observable<any> = Rx.of([{
      id: 7,
      name: "Edunildo Gomes Alberto ",
      phone: "(258) 847651504",
      countryCode: "258",
      country: "Mozambique",
      phoneValid: true
    }]);
    let filteredCustomer = spyOn(httpClient,"get").and.callFake(() => {
      return mockedCustomers;
    });
    let customerFilterDTO: CustomerFilterDTO = {countryCode: null, phoneState: null};
    expect(customerService.getCustomers(customerFilterDTO)).toEqual(mockedCustomers);
  });

  it('should generate query parameters from filter DTO without any filters when customerFilterDTO is empty', () => {
    let customerFilterDTO: CustomerFilterDTO = {countryCode: null, phoneState: null};
    let queryParams: string = customerService.buildQueryParameters(customerFilterDTO);
    expect(queryParams).toEqual('');
  });

  it('should generate query parameters from filter DTO with countryCode only when customerFilterDTO has country code only', () => {
    let customerFilterDTO: CustomerFilterDTO = {countryCode: '237', phoneState: null};
    let queryParams: string = customerService.buildQueryParameters(customerFilterDTO);
    expect(queryParams).toEqual('?countryCode=237');
  });

  it('should generate query parameters from filter DTO with phoneValid only when customerFilterDTO has phone valid only', () => {
    let customerFilterDTO: CustomerFilterDTO = {countryCode: null, phoneState: 'true'};
    let queryParams: string = customerService.buildQueryParameters(customerFilterDTO);
    expect(queryParams).toEqual('?phoneValid=true');
  });

  it('should generate query parameters from filter DTO with countryCode and phoneValid only when customerFilterDTO has country code and phone valid', () => {
    let customerFilterDTO: CustomerFilterDTO = {countryCode: '237', phoneState: 'false'};
    let queryParams: string = customerService.buildQueryParameters(customerFilterDTO);
    expect(queryParams).toEqual('?countryCode=237&phoneValid=false');
  });

});
