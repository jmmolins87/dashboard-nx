import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceStatusBadge } from './invoice-status-badge';

describe('InvoiceStatusBadge', () => {
  let component: InvoiceStatusBadge;
  let fixture: ComponentFixture<InvoiceStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceStatusBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
