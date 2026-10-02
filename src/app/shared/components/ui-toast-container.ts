import { Component, input, output, computed, inject } from '@angular/core';
import { Notifications } from '../../services/notifications';
import { ToastMessage, ToastType } from '../../models/notification.model';

@Component({
  selector: 'app-ui-toast-container',
  templateUrl: './ui-toast-container.html',
  styleUrl: './ui-toast-container.scss',
})
export class UiToastContainer {
  private readonly notifications = inject(Notifications);
  readonly toasts = computed(() => this.notifications.toasts());

  readonly clasesToast = computed(() => (tipo: ToastType) => [
    'ui-toast',
    `ui-toast--${tipo}`,
  ]);

  cerrar(id: string): void {
    this.notifications.removerToast(id);
  }
}