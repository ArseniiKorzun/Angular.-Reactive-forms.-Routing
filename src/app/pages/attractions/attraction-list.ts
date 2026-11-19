import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ATTRACTIONS } from '../../data/lviv.data';

const CATEGORIES = ['історія', 'архітектура', 'природа'];

@Component({
  selector: 'app-attraction-list',
  imports: [RouterLink],
  template: `
    @if (from()) {
      <p><small>Перехід із: {{ from() }}</small></p>
    }
    <p>
      Фільтр за категорією:
      <a [routerLink]="[]" [queryParams]="{ category: null }">усі</a>
      @for (c of categories; track c) {
        | <a [routerLink]="[]" [queryParams]="{ category: c }">{{ c }}</a>
      }
    </p>
    <ul>
      @for (a of list(); track a.id) {
        <li><a [routerLink]="['/attractions', a.id]" [queryParams]="{ from: 'list' }">{{ a.name }}</a> ({{ a.category }})</li>
      } @empty {
        <li>Немає пам'яток у цій категорії.</li>
      }
    </ul>
  `,
})
export class AttractionList {
  readonly category = input<string>();
  readonly from = input<string>();
  protected readonly categories = CATEGORIES;
  protected readonly list = computed(() =>
    this.category() ? ATTRACTIONS.filter((a) => a.category === this.category()) : ATTRACTIONS,
  );
}
