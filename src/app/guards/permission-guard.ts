import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Permissions } from '../services/permissions';
import { Notifications } from '../services/notifications';
import { Permission } from '../models/user.model';

export const permissionGuard = (permiso: Permission) => {
  const guard: CanActivateFn = () => {
    const perms = inject(Permissions);
    const router = inject(Router);
    const notifications = inject(Notifications);
    if (perms.tienePermiso(permiso)) return true;
    notifications.advertencia('Acceso denegado', `No tienes permiso: ${permiso}`);
    return router.parseUrl('/');
  };
  return guard;
};