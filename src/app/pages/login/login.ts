import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  template: `
    <h1>Вхід</h1>
    <p>Сторінка фотографій доступна лише авторизованим користувачам.</p>
    <button (click)="login()">Увійти</button>
    <p><a routerLink="/">← На головну</a></p>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected login(): void {
    this.auth.login();
    this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') ?? '/');
  }
}
