import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStockBadge } from './product-stock-badge';

describe('ProductStockBadge', () => {
  let component: ProductStockBadge;
  let fixture: ComponentFixture<ProductStockBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStockBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
