import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ATTRACTIONS, CITY, LANDMARK } from '../../data/lviv.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1>Ласкаво просимо до Львова</h1>
    <p>{{ city.description }}</p>

    <h2>Розділи</h2>
    <ul>
      <li><a routerLink="/city">Інформація про місто</a></li>
      <li><a routerLink="/landmark">Найвідоміша пам'ятка: {{ landmark.name }}</a></li>
      <li><a routerLink="/attractions" [queryParams]="{ from: 'home' }">Інші визначні пам'ятки</a></li>
      <li><a routerLink="/photos">Фотографії міста (потребує входу)</a></li>
      <li><a routerLink="/register">Реєстрація користувача (реактивна форма)</a></li>
    </ul>

    <h2>Пам'ятки з параметрами маршруту</h2>
    <ul>
      @for (a of attractions; track a.id) {
        <li>
          <a [routerLink]="['/attractions', a.id]" [queryParams]="{ from: 'home' }">{{ a.name }}</a>
        </li>
      }
    </ul>
  `,
})
export class Home {
  protected readonly city = CITY;
  protected readonly landmark = LANDMARK;
  protected readonly attractions = ATTRACTIONS;
}
