import { Component, inject, computed, signal, HostListener, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../services/auth';
import { Notifications } from '../services/notifications';
import { ThemeService } from '../services/theme';
import { GlobalSearch } from '../services/global-search';
import { UiButton } from '../shared/components/ui-button';
import { UiToastContainer } from '../shared/components/ui-toast-container';

@Component({
  selector: 'app-header',
  imports: [UiButton, UiToastContainer],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly auth = inject(Auth);
  private readonly notifications = inject(Notifications);
  private readonly theme = inject(ThemeService);
  private readonly globalSearch = inject(GlobalSearch);
  private readonly router = inject(Router);

  readonly usuario = computed(() => this.auth.usuario());
  readonly busqueda = signal('');
  readonly resultados = computed(() => this.globalSearch.buscar(this.busqueda()));
  readonly mostrarResultados = signal(false);

  @HostListener('document:click', ['$event'])
  onClickOutside(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.app-header__busqueda')) this.mostrarResultados.set(false);
  }

  buscar(): void {
    this.mostrarResultados.set(this.busqueda().trim().length >= 2);
  }

  irA(url: string): void {
    this.router.navigateByUrl(url);
    this.mostrarResultados.set(false);
    this.busqueda.set('');
  }

  logout(): void {
    this.auth.logout();
  }

  alternarTema(): void {
    this.theme.alternarTema();
  }
}