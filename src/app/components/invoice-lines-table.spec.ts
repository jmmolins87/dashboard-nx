import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceLinesTable } from './invoice-lines-table';

describe('InvoiceLinesTable', () => {
  let component: InvoiceLinesTable;
  let fixture: ComponentFixture<InvoiceLinesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceLinesTable],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceLinesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
