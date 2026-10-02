import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Notifications } from '../services/notifications';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const notifications = inject(Notifications);
  const user = auth.usuario();
  if (user?.rol === 'admin') return true;
  notifications.error('Acceso denegado', 'Se requiere rol de administrador');
  return router.parseUrl('/');
};