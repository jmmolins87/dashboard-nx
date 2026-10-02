import { Service } from '@angular/core';
import { signal, computed, inject, effect } from '@angular/core';
import { AppState } from './app-state';
import { isPlatformBrowser } from '@angular/common'; import { PLATFORM_ID } from '@angular/core';
import { ThemeMode } from '../models/preferences.model';

@Service()
export class ThemeService {
  private readonly state = inject(AppState);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tema = computed(() => this.state.preferencias().tema);
  readonly densidad = computed(() => this.state.preferencias().densidad);

  constructor() {
    effect(() => {
      const t = this.tema();
      if (this.isBrowser) {
        document.body.setAttribute('data-theme', t);
        localStorage.setItem('tema', t);
      }
    });

    effect(() => {
      const d = this.densidad();
      if (this.isBrowser) {
        document.body.setAttribute('data-densidad', d);
        localStorage.setItem('densidad', d);
      }
    });
  }

  inicializarDesdeStorage(): void {
    if (!this.isBrowser) return;
    const temaGuardado = localStorage.getItem('tema') as ThemeMode | null;
    const densidadGuardada = localStorage.getItem('densidad') as 'comoda' | 'compacta' | null;
    if (temaGuardado) this.state.actualizarPreferencias({ tema: temaGuardado });
    if (densidadGuardada) this.state.actualizarPreferencias({ densidad: densidadGuardada });
  }

  alternarTema(): void {
    const actual = this.tema();
    this.state.actualizarPreferencias({ tema: actual === 'claro' ? 'oscuro' : 'claro' });
  }

  alternarDensidad(): void {
    const actual = this.densidad();
    this.state.actualizarPreferencias({ densidad: actual === 'comoda' ? 'compacta' : 'comoda' });
  }
}