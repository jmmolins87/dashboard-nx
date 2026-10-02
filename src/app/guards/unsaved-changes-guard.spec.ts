import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<{ hayCambios: () => boolean }> = (component, currentRoute, currentState, nextState) =>
    TestBed.runInInjectionContext(() => unsavedChangesGuard(component, currentRoute, currentState, nextState));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const guard = executeGuard({ hayCambios: () => false } as any, {} as any, {} as RouterStateSnapshot, {} as RouterStateSnapshot);
    expect(guard).toBeTruthy();
  });
});