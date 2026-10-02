import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Users } from './users';
import { HttpClient } from '@angular/common/http';
import { AppPreferences, PREFERENCIAS_INICIALES, ThemeMode, DensityMode } from '../models/preferences.model';
import { ServerConfig, SERVER_CONFIG_MOCK } from '../models/server-config.model';
import { delay, of } from 'rxjs';

@Service()
export class Settings {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly users = inject(Users);
  private readonly http = inject(HttpClient);

  readonly preferencias = computed(() => this.state.preferencias());
  readonly informesHabilitados = computed(() => this.state.preferencias().informesHabilitados);

  actualizarPreferencias(parcial: Partial<AppPreferences>): void {
    const nuevas = { ...this.state.preferencias(), ...parcial };
    this.state.actualizarPreferencias(nuevas);
    this.eventBus.emit('preferences-updated', { preferencias: nuevas });
  }

  restablecerPreferencias(): void {
    this.state.actualizarPreferencias(PREFERENCIAS_INICIALES);
  }

  alternarTema(): void {
    const actual = this.state.preferencias().tema;
    this.actualizarPreferencias({ tema: actual === 'claro' ? 'oscuro' : 'claro' });
  }

  alternarDensidad(): void {
    const actual = this.state.preferencias().densidad;
    this.actualizarPreferencias({ densidad: actual === 'comoda' ? 'compacta' : 'comoda' });
  }

  async obtenerConfigServidor(): Promise<ServerConfig> {
    try {
      const config = await this.http.get<ServerConfig>('/api/config').pipe(delay(300)).toPromise();
      return config ?? SERVER_CONFIG_MOCK;
    } catch {
      return SERVER_CONFIG_MOCK;
    }
  }
}