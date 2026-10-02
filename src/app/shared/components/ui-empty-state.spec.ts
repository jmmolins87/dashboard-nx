import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiEmptyState } from './ui-empty-state';

describe('UiEmptyState', () => {
  let component: UiEmptyState;
  let fixture: ComponentFixture<UiEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(UiEmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
