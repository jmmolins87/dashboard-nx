import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { reportsEnabledGuard } from './reports-enabled-guard';

describe('reportsEnabledGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => reportsEnabledGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
