import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersFilterPanel } from './orders-filter-panel';

describe('OrdersFilterPanel', () => {
  let component: OrdersFilterPanel;
  let fixture: ComponentFixture<OrdersFilterPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersFilterPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersFilterPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
