import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockMovementsTable } from './stock-movements-table';

describe('StockMovementsTable', () => {
  let component: StockMovementsTable;
  let fixture: ComponentFixture<StockMovementsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(StockMovementsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
