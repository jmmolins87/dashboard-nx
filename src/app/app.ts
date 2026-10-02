import { Component, inject, effect, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';
import { ThemeService } from './services/theme';
import { Auth } from './services/auth';
import { UiToastContainer } from './shared/components/ui-toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, UiToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly auth = inject(Auth);
  readonly titulo = signal('Acme ERP — Panel de control');

  @ViewChild(Sidebar) sidebar!: Sidebar;

  constructor() {
    effect(() => {
      this.theme.inicializarDesdeStorage();
      this.auth.sesionDemo();
    });
  }
}