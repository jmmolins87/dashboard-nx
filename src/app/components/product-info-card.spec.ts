import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInfoCard } from './product-info-card';

describe('ProductInfoCard', () => {
  let component: ProductInfoCard;
  let fixture: ComponentFixture<ProductInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
