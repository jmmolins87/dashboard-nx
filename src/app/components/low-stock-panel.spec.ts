import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LowStockPanel } from './low-stock-panel';

describe('LowStockPanel', () => {
  let component: LowStockPanel;
  let fixture: ComponentFixture<LowStockPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
