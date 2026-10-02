import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { Permissions } from '../services/permissions';

@Directive({ selector: '[appHasPermission]' })
export class HasPermissionDirective {
  private readonly tpl = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly perms = inject(Permissions);
  readonly appHasPermission = input<string>('');

  constructor() {
    effect(() => {
      const permiso = this.appHasPermission();
      const tiene = permiso ? this.perms.tienePermiso(permiso as any) : true;
      if (tiene) {
        this.vcr.createEmbeddedView(this.tpl);
      } else {
        this.vcr.clear();
      }
    });
  }
}