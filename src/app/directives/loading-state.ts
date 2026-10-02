import { Directive, ElementRef, HostBinding, inject, input } from '@angular/core';

@Directive({ selector: '[appLoadingState]' })
export class LoadingStateDirective {
  private readonly el = inject(ElementRef<HTMLButtonElement>);
  readonly appLoadingState = input(false);

  @HostBinding('class.app-loading') get loading() {
    return this.appLoadingState();
  }

  @HostBinding('attr.disabled') get disabled() {
    return this.appLoadingState() || null;
  }
}