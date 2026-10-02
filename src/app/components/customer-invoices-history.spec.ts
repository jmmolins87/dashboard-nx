import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerInvoicesHistory } from './customer-invoices-history';

describe('CustomerInvoicesHistory', () => {
  let component: CustomerInvoicesHistory;
  let fixture: ComponentFixture<CustomerInvoicesHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInvoicesHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerInvoicesHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
