// Shared UI Components
export { UiButton } from './components/ui-button';
export type { VarianteBoton as UiButtonVariante, TamanoBoton as UiButtonTamano } from './components/ui-button';

export { UiInput } from './components/ui-input';
export { UiSelect } from './components/ui-select';
export { UiTable } from './components/ui-table';
export type { UiColumna } from './components/ui-table';

export { UiModal } from './components/ui-modal';
export { UiToastContainer } from './components/ui-toast-container';
export { UiTabs } from './components/ui-tabs';
export { UiBadge } from './components/ui-badge';
export type { VarianteBadge } from './components/ui-badge';

export { UiCard } from './components/ui-card';
export { UiSkeleton } from './components/ui-skeleton';
export { UiEmptyState } from './components/ui-empty-state';
export { UiPagination } from './components/ui-pagination';
export { UiConfirmDialog } from './components/ui-confirm-dialog';
export { UiPageHeader } from './components/ui-page-header';

// Validators
export * from './validators';

// Helpers
export * from './helpers';

// LocalStorage Service
export { LocalStorageService } from './local-storage.service';

// Pipes re-exported
export { CurrencyDisplayPipe } from '../pipes/currency-display-pipe';
export { DateDisplayPipe } from '../pipes/date-display-pipe';
export { RelativeTimePipe } from '../pipes/relative-time-pipe';
export { StatusLabelPipe } from '../pipes/status-label-pipe';
export { TruncatePipe } from '../pipes/truncate-pipe';
export { PercentagePipe } from '../pipes/percentage-pipe';
export { InitialsPipe } from '../pipes/initials-pipe';

// Directives re-exported
export { AutofocusDirective } from '../directives/autofocus';
export { HasPermissionDirective } from '../directives/has-permission';
export { LoadingStateDirective } from '../directives/loading-state';
export { TooltipDirective } from '../directives/tooltip';
export { SortableHeaderDirective } from '../directives/sortable-header';

// Models re-exported (cajón de sastre)
export * from '../models/pagination.model';
export * from '../models/order.model';
export * from '../models/customer.model';
export * from '../models/customer-record.model';
export * from '../models/invoice.model';
export * from '../models/order-line.model';
export * from '../models/payment.model';
export * from '../models/product.model';
export * from '../models/catalog-entry.model';
export * from '../models/stock.model';
export * from '../models/user.model';
export * from '../models/app-user.model';
export * from '../models/preferences.model';
export * from '../models/notification.model';
export * from '../models/report.model';
export * from '../models/common.model';
export * from '../models/search.model';
export * from '../models/domain-event.model';
export * from '../models/server-config.model';
export * from '../models/api-error.model';

// Utils re-exported
export * from '../utils/array.utils';
export * from '../utils/seed.utils';
export * from '../utils/id.utils';
export * from '../utils/csv.utils';
export * from '../utils/date-range.utils';
export * from '../utils/form.utils';

// Vendor re-exports (acoplamiento directo intencional)
export * from '../../vendor/acme-utils';
export * from '../../vendor/acme-ui-kit';