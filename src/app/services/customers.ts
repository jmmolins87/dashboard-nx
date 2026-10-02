import { Service } from '@angular/core';
import { signal, computed, inject } from '@angular/core';
import { AppState } from './app-state';
import { EventBus } from './event-bus';
import { Orders } from './orders';
import { Billing } from './billing';
import { Injector } from '@angular/core';
import { Customer, CustomerFilters, CustomerSegment, CustomerStatus, CustomerAddress } from '../models/customer.model';
import { CustomerRecord as CustRec } from '../models/customer-record.model';
import { OrderRef } from '../models/order.model';

@Service()
export class CustomerService {
  private readonly state = inject(AppState);
  private readonly eventBus = inject(EventBus);
  private readonly injector = inject(Injector);
  private ordersSvc?: Orders;
  private billingSvc?: Billing;

  private get orders(): Orders {
    this.ordersSvc ??= this.injector.get(Orders);
    return this.ordersSvc;
  }

  private get billing(): Billing {
    this.billingSvc ??= this.injector.get(Billing);
    return this.billingSvc;
  }

  readonly cargando = computed(() => this.state.cargandoClientes());
  readonly lista = computed(() => this.state.clientesFiltrados());

  readonly porSegmento = computed(() => this.state.clientesPorSegmento());

  actualizarFiltros(parcial: Partial<CustomerFilters>): void {
    this.state.filtrosClientes.update((f) => ({ ...f, ...parcial }));
  }

  clientePorId(id: string): Customer | undefined {
    return this.state.clientes().find((c) => c.id === id);
  }

  clienteNombre(id: string): string {
    return this.clientePorId(id)?.nombre ?? id;
  }

  pedidosDeCliente(clienteId: string): OrderRef[] {
    return this.orders.lista().filter((p) => p.clienteId === clienteId).map((p) => ({
      id: p.id,
      numero: p.numero,
      estado: p.estado,
      fecha: p.fecha,
      total: this.orders.recalcularTotales(p).total,
    }));
  }

  facturasDeCliente(clienteId: string) {
    return this.billing.facturasFiltradasPorCliente(clienteId);
  }

  guardarCliente(cliente: Customer): void {
    const existe = this.state.clientes().some((c) => c.id === cliente.id);
    if (existe) {
      this.state.actualizarCliente(cliente);
    } else {
      this.state.clientes.update((l) => [cliente, ...l]);
    }
    this.eventBus.emit('customer-updated', { cliente });
  }

  toRecord(c: Customer): CustRec {
    return {
      id: c.id,
      code: c.codigo,
      name: c.nombre,
      companyName: c.razonSocial,
      emailContact: c.email,
      phone: c.telefono,
      segment: c.segmento,
      status: c.estado,
      city: c.direccion.ciudad,
      creditLimit: c.limiteCredito,
      registeredAt: c.alta,
      openInvoices: this.facturasDeCliente(c.id).filter((f) => f.total > f.pagado).length,
    };
  }

  crearNuevo(): Customer {
    const nuevo: Customer = {
      id: `CLI-NEW-${Date.now()}`,
      codigo: `C-NEW`,
      nombre: '',
      razonSocial: '',
      cif: '',
      email: '',
      telefono: '',
      segmento: 'nuevo',
      estado: 'activo',
      direccion: { calle: '', ciudad: '', provincia: '', cp: '', pais: 'ES' },
      limiteCredito: 3000,
      iban: '',
      alta: new Date().toISOString(),
      contacto: '',
    };
    return nuevo;
  }

  segmentos(): CustomerSegment[] {
    return ['vip', 'mayorista', 'minorista', 'nuevo'];
  }

  estados(): CustomerStatus[] {
    return ['activo', 'inactivo', 'moroso', 'bloqueado'];
  }
}