import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceDetailPage } from './invoice-detail-page';

describe('InvoiceDetailPage', () => {
  let component: InvoiceDetailPage;
  let fixture: ComponentFixture<InvoiceDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
