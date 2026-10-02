import { TestBed } from '@angular/core/testing';
import { CustomerStats } from './customer-stats';

describe('CustomerStats', () => {
  let service: CustomerStats;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerStats);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
