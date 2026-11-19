import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANDMARK } from '../../data/lviv.data';

@Component({
  selector: 'app-landmark',
  imports: [RouterLink],
  template: `
    <h1>{{ landmark.name }}</h1>
    <p><i>Категорія: {{ landmark.category }}</i></p>
    <p>{{ landmark.description }}</p>
    <a routerLink="/">← На головну</a>
  `,
})
export class Landmark {
  protected readonly landmark = LANDMARK;
}
