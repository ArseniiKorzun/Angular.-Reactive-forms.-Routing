import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const PHOTOS = [
  { title: 'Ратуша', hue: 30 },
  { title: 'Оперний театр', hue: 200 },
  { title: 'Ринкова площа', hue: 120 },
  { title: 'Вид з Високого Замку', hue: 280 },
];

@Component({
  selector: 'app-photos',
  imports: [RouterLink],
  template: `
    <h1>Фотографії Львова</h1>
    <button (click)="logout()">Вийти</button>
    <div class="gallery">
      @for (p of photos; track p.title) {
        <figure [style.background]="'hsl(' + p.hue + ', 60%, 75%)'">
          <figcaption>{{ p.title }}</figcaption>
        </figure>
      }
    </div>
    <a routerLink="/">← На головну</a>
  `,
  styles: `
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    figure { margin: 0; height: 160px; display: flex; align-items: flex-end; border-radius: 8px; }
    figcaption { background: rgba(255, 255, 255, 0.8); padding: 4px 8px; width: 100%; border-radius: 0 0 8px 8px; }
  `,
})
export class Photos {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly photos = PHOTOS;

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
