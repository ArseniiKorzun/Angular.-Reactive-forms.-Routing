import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ATTRACTIONS } from '../../data/lviv.data';

@Component({
  selector: 'app-attraction-detail',
  imports: [RouterLink],
  template: `
    @if (attraction(); as a) {
      <h2>{{ a.name }}</h2>
      <p><i>Категорія: {{ a.category }}</i></p>
      <p>{{ a.description }}</p>
    } @else {
      <h2>Пам'ятку не знайдено</h2>
    }
    @if (from()) {
      <p><small>Перехід із: {{ from() }}</small></p>
    }
    <a routerLink="/attractions">← До списку пам'яток</a>
  `,
})
export class AttractionDetail {
  readonly id = input.required<string>();
  readonly from = input<string>();
  protected readonly attraction = computed(() => ATTRACTIONS.find((a) => a.id === this.id()));
}
