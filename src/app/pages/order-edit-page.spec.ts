import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderEditPage } from './order-edit-page';

describe('OrderEditPage', () => {
  let component: OrderEditPage;
  let fixture: ComponentFixture<OrderEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
