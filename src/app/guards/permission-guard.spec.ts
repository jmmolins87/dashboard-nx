import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { permissionGuard } from './permission-guard';
import { Permissions } from '../services/permissions';
import { Notifications } from '../services/notifications';

describe('permissionGuard', () => {
  let permissions: Permissions;
  let notifications: Notifications;
  let router: Router;

  const executeGuard = (permiso: string): CanActivateFn => {
    return TestBed.runInInjectionContext(() => permissionGuard(permiso as any));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const guard = executeGuard('pedidos.ver');
    expect(guard).toBeTruthy();
  });
});