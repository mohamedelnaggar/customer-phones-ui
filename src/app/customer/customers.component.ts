import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core'
import {isPlatformBrowser} from '@angular/common';
import {CustomerDto} from "../model/customer.dto";
import {CustomerService} from "../service/customer.service";
import {CountryDTO} from "../model/country.dto";
import {CustomerFilterDTO} from "../model/customer.filter.dto";
import {CountryService} from "../service/country.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customerDTOs: CustomerDto[] = [];
  public customerFilterDTO: CustomerFilterDTO = {countryCode: null, phoneState: null};
  public countries: CountryDTO[] = [];

  constructor(private customerService: CustomerService, private countryService: CountryService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadInitialData();
    }
  }

  private loadInitialData() {
    this.countryService.getCountries().subscribe((countryDTOsRes: CountryDTO[]) => {
      this.countries = countryDTOsRes;
      this.getCustomerDTOs();
    });
  }

  /**
   * Get Countries Phones Data
   */
  getCustomerDTOs(){
    this.customerDTOs = [];
    this.customerService.getCustomers(this.customerFilterDTO).subscribe( (customerDTOsRes : CustomerDto[]) =>{
      this.customerDTOs = customerDTOsRes;
    });
  }

  /**
   * on Change Country
   */
  onChangeCountry(event: any){
    console.log(event.target.value);
    this.customerFilterDTO.countryCode = event.target.value;
    this.getCustomerDTOs();
  }

  /**
   * on Change phoneValid
   */
  onChangeState(event: any){
    this.customerFilterDTO.phoneState = event.target.value;
    this.getCustomerDTOs();
  }


}
