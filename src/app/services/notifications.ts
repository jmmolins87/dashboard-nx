import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { ToastMessage, ToastType, Notification, TOAST_DEFAULTS } from '../models/notification.model';
import { isPlatformBrowser } from '@angular/common'; import { PLATFORM_ID } from '@angular/core';

@Service()
export class Notifications {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly toasts = computed(() => this.state.toasts());
  readonly noLeidas = computed(() => this.state.notificacionesNoLeidas());

  mostrarToast(titulo: string, mensaje?: string, tipo: ToastType = 'info', duracion?: number): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const toast: ToastMessage = { id, tipo, titulo, mensaje, duracion: duracion ?? TOAST_DEFAULTS[tipo] };
    this.state.agregarToast(toast);
    if (this.isBrowser && toast.duracion && toast.duracion > 0) {
      setTimeout(() => this.removerToast(id), toast.duracion);
    }
    return id;
  }

  exito(titulo: string, mensaje?: string): string {
    return this.mostrarToast(titulo, mensaje, 'exito');
  }

  error(titulo: string, mensaje?: string): string {
    return this.mostrarToast(titulo, mensaje, 'error');
  }

  info(titulo: string, mensaje?: string): string {
    return this.mostrarToast(titulo, mensaje, 'info');
  }

  advertencia(titulo: string, mensaje?: string): string {
    return this.mostrarToast(titulo, mensaje, 'advertencia');
  }

  removerToast(id: string): void {
    this.state.removerToast(id);
  }

  agregarNotificacion(notif: Notification): void {
    this.state.agregarNotificacion(notif);
  }

  marcarLeida(id: string): void {
    this.state.marcarNotificacionLeida(id);
  }

  marcarTodasLeidas(): void {
    this.state.notificaciones.update((l) => l.map((n) => ({ ...n, leida: true })));
  }
}