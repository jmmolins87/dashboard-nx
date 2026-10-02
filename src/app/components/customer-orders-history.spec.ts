import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerOrdersHistory } from './customer-orders-history';

describe('CustomerOrdersHistory', () => {
  let component: CustomerOrdersHistory;
  let fixture: ComponentFixture<CustomerOrdersHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrdersHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerOrdersHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
