import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsvExportButton } from './csv-export-button';

describe('CsvExportButton', () => {
  let component: CsvExportButton;
  let fixture: ComponentFixture<CsvExportButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvExportButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CsvExportButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
