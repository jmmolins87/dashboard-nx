import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { isPlatformBrowser } from '@angular/common'; import { PLATFORM_ID } from '@angular/core';
import { Type } from '@angular/core';

export interface DialogConfig {
  titulo: string;
  mensaje: string;
  tipo?: 'confirmar' | 'alerta' | 'informacion';
  confirmarTexto?: string;
  cancelarTexto?: string;
}

export interface DialogRef {
  cerrar: (resultado?: boolean) => void;
  resultado: Promise<boolean>;
}

@Service()
export class Dialog {
  private readonly state = inject(AppState);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private pila: Array<{ config: DialogConfig; resolve: (v: boolean) => void }> = [];

  readonly actual = computed(() => this.pila[0] ?? null);

  confirmar(config: DialogConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.pila.push({ config: { ...config, tipo: 'confirmar' }, resolve });
    });
  }

  alerta(config: DialogConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.pila.push({ config: { ...config, tipo: 'alerta', cancelarTexto: undefined }, resolve });
    });
  }

  cerrar(resultado = false): void {
    const item = this.pila.shift();
    if (item) item.resolve(resultado);
  }
}