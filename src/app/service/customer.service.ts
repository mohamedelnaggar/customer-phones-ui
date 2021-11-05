import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {CustomerFilterDTO} from "../model/customer.filter.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers(customerFilterDTO: CustomerFilterDTO): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/customers' + this.buildQueryParameters(customerFilterDTO));
  }

  buildQueryParameters(customerFilterDTO: CustomerFilterDTO): string {
    let queryParameters = '';
    if(customerFilterDTO.countryCode != null && customerFilterDTO.countryCode != 'null') {
      queryParameters = `${queryParameters}&countryCode=${customerFilterDTO.countryCode}`;
    }
    if(customerFilterDTO.phoneState != null && customerFilterDTO.phoneState != 'null') {
      queryParameters = `${queryParameters}&phoneValid=${customerFilterDTO.phoneState}`;
    }

    if(queryParameters != '') {
      queryParameters = queryParameters.replace('&', '?');
    }
    return queryParameters;
  }
}
