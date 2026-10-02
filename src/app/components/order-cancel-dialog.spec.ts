import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderCancelDialog } from './order-cancel-dialog';

describe('OrderCancelDialog', () => {
  let component: OrderCancelDialog;
  let fixture: ComponentFixture<OrderCancelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCancelDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCancelDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
