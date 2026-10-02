import { TestBed } from '@angular/core/testing';
import { GlobalSearch } from './global-search';

describe('GlobalSearch', () => {
  let service: GlobalSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
