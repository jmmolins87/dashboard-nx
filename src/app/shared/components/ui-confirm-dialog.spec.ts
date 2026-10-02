import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiConfirmDialog } from './ui-confirm-dialog';

describe('UiConfirmDialog', () => {
  let component: UiConfirmDialog;
  let fixture: ComponentFixture<UiConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UiConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
