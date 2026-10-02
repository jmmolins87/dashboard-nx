import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentHistoryTable } from './payment-history-table';

describe('PaymentHistoryTable', () => {
  let component: PaymentHistoryTable;
  let fixture: ComponentFixture<PaymentHistoryTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentHistoryTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentHistoryTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
