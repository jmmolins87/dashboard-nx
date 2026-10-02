import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsSummaryTable } from './reports-summary-table';

describe('ReportsSummaryTable', () => {
  let component: ReportsSummaryTable;
  let fixture: ComponentFixture<ReportsSummaryTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSummaryTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsSummaryTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
