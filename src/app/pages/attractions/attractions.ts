import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-attractions',
  imports: [RouterLink, RouterOutlet],
  template: `
    <h1>Визначні пам'ятки</h1>
    <nav>
      <a routerLink="/attractions">Список</a> |
      <a routerLink="/">← На головну</a>
    </nav>
    <router-outlet />
  `,
})
export class Attractions {}
