import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly appAutofocus = input(false);

  constructor() {
    effect(() => {
      if (this.appAutofocus()) {
        setTimeout(() => this.el.nativeElement.focus(), 0);
      }
    });
  }
}