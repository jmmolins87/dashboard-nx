import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Dialog } from '../services/dialog';

export interface TieneCambiosPendientes {
  hayCambios(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<TieneCambiosPendientes> = async (component) => {
  if (!component.hayCambios()) return true;
  const dialog = inject(Dialog);
  return await dialog.confirmar({
    titulo: 'Cambios sin guardar',
    mensaje: 'Tienes cambios sin guardar. ¿Seguro que quieres salir?',
    confirmarTexto: 'Salir',
    cancelarTexto: 'Quedarme',
  });
};