import { Component, input } from '@angular/core';
import { Kpi } from '../models/report.model';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
})
export class KpiCard {
  readonly kpi = input.required<Kpi>();
}