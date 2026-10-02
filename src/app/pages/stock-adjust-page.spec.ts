import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAdjustPage } from './stock-adjust-page';

describe('StockAdjustPage', () => {
  let component: StockAdjustPage;
  let fixture: ComponentFixture<StockAdjustPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAdjustPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StockAdjustPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
