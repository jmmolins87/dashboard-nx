import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerStatsCard } from './customer-stats-card';

describe('CustomerStatsCard', () => {
  let component: CustomerStatsCard;
  let fixture: ComponentFixture<CustomerStatsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerStatsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
