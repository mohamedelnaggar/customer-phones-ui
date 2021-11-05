import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import * as Rx from 'rxjs';
import {CustomersComponent} from "./customers.component";
import {CustomerService} from "../service/customer.service";
import {CountryService} from "../service/country.service";

describe('CustomersComponent Tests', () => {
  let customersComponent: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerService: CustomerService;
  let countryService: CountryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [CustomerService, CountryService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    customersComponent = fixture.componentInstance;
    fixture.detectChanges();
    customerService = TestBed.get(CustomerService);
    countryService = TestBed.get(CountryService);
  });

  it('should test that CustomersComponent have been created', () => {
    expect(customersComponent).toBeTruthy();
  });

  it('should test getCustomer() with data returned', () => {
    let getCountriesPhones = spyOn(customerService,"getCustomers").and.callFake(() => {
      return Rx.of([{
        id: 7,
        name: "Edunildo Gomes Alberto ",
        phone: "(258) 847651504",
        countryCode: "258",
        country: "Mozambique",
        phoneValid: true
      }])
    });
    customersComponent.getCustomerDTOs();
    expect(customerService.getCustomers).toHaveBeenCalled;
    expect(customersComponent.customerDTOs.length).toBe(1);
  });


});
