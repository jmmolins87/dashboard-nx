import { Service } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DomainEvent, DomainEventType } from '../models/domain-event.model';

@Service()
export class EventBus {
  private readonly subject = new Subject<DomainEvent>();

  emit(tipo: DomainEventType, payload: unknown): void {
    this.subject.next({ tipo, payload, emitidoEn: Date.now() });
  }

  on(tipo?: DomainEventType): Observable<DomainEvent> {
    const $ = this.subject.asObservable();
    return tipo ? $.pipe(filter((e) => e.tipo === tipo)) : $;
  }
}