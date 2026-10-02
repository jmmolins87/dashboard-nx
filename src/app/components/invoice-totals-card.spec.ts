import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceTotalsCard } from './invoice-totals-card';

describe('InvoiceTotalsCard', () => {
  let component: InvoiceTotalsCard;
  let fixture: ComponentFixture<InvoiceTotalsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTotalsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceTotalsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
