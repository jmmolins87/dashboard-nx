import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPaymentPage } from './register-payment-page';

describe('RegisterPaymentPage', () => {
  let component: RegisterPaymentPage;
  let fixture: ComponentFixture<RegisterPaymentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPaymentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPaymentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
