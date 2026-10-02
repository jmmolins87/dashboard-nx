import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({ selector: '[appTooltip]' })
export class TooltipDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly appTooltip = input<string>('');
  private readonly tooltipId = `tooltip-${Math.random().toString(36).slice(2, 8)}`;
  private tooltipEl?: HTMLElement;

  @HostListener('mouseenter')
  onEnter(): void {
    const texto = this.appTooltip();
    if (!texto) return;
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.id = this.tooltipId;
    this.tooltipEl.className = 'app-tooltip';
    this.tooltipEl.textContent = texto;
    document.body.appendChild(this.tooltipEl);
    this.posicionar();
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.tooltipEl?.remove();
    this.tooltipEl = undefined;
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.tooltipEl) this.posicionar();
  }

  private posicionar(): void {
    if (!this.tooltipEl) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.tooltipEl.style.top = `${rect.bottom + 6}px`;
    this.tooltipEl.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltipEl.style.transform = 'translateX(-50%)';
  }
}