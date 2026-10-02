import { TestBed } from '@angular/core/testing';
import { OrderCalculations } from './order-calculations';

describe('OrderCalculations', () => {
  let service: OrderCalculations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCalculations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
