import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAdjustForm } from './stock-adjust-form';

describe('StockAdjustForm', () => {
  let component: StockAdjustForm;
  let fixture: ComponentFixture<StockAdjustForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAdjustForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StockAdjustForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
