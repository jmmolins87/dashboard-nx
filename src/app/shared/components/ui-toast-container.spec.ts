import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiToastContainer } from './ui-toast-container';

describe('UiToastContainer', () => {
  let component: UiToastContainer;
  let fixture: ComponentFixture<UiToastContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiToastContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(UiToastContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
