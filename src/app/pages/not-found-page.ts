import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiCard } from '../shared/components/ui-card';
import { UiButton } from '../shared/components/ui-button';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, UiCard, UiButton],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {}
