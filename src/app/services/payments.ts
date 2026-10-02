import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Payment, PaymentMethod, PaymentStatus } from '../models/payment.model';

@Service()
export class Payments {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);

  registrar(
    facturaId: string,
    clienteId: string,
    importe: number,
    metodo: PaymentMethod,
    referencia: string,
    notas: string
  ): Payment {
    const pago: Payment = {
      id: `PAY-${Date.now()}`,
      facturaId,
      clienteId,
      fecha: new Date().toISOString(),
      importe,
      metodo,
      estado: 'registrado',
      referencia,
      notas,
    };
    this.eventBus.emit('payment-registered', { pago, facturaId, clienteId });
    return pago;
  }
}