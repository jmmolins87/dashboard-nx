import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; import { PLATFORM_ID } from '@angular/core';

@Service()
export class LocalStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  get<T>(clave: string, porDefecto: T): T {
    if (!this.isBrowser) return porDefecto;
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : porDefecto;
    } catch {
      return porDefecto;
    }
  }

  set<T>(clave: string, valor: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // ignore quota exceeded
    }
  }

  remove(clave: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(clave);
  }
}