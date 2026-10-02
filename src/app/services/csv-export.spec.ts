import { TestBed } from '@angular/core/testing';
import { CsvExport } from './csv-export';

describe('CsvExport', () => {
  let service: CsvExport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvExport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
