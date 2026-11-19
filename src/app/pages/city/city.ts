import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CITY } from '../../data/lviv.data';

@Component({
  selector: 'app-city',
  imports: [RouterLink],
  template: `
    <h1>{{ city.name }}</h1>
    <p>Засноване у {{ city.founded }} році.</p>
    <p>{{ city.description }}</p>
    <a routerLink="/">← На головну</a>
  `,
})
export class City {
  protected readonly city = CITY;
}
