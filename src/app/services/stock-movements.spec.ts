import { TestBed } from '@angular/core/testing';
import { StockMovements } from './stock-movements';

describe('StockMovements', () => {
  let service: StockMovements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMovements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
