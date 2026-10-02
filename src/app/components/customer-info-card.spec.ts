import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerInfoCard } from './customer-info-card';

describe('CustomerInfoCard', () => {
  let component: CustomerInfoCard;
  let fixture: ComponentFixture<CustomerInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInfoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerInfoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
