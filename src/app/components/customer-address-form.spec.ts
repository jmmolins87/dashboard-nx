import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddressForm } from './customer-address-form';

describe('CustomerAddressForm', () => {
  let component: CustomerAddressForm;
  let fixture: ComponentFixture<CustomerAddressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddressForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddressForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
