import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

const EDUCATION_OPTIONS = [
  'Дошкільна освіта',
  'Повна загальна середня освіта',
  'Професійна (професійно-технічна) освіта',
  'Фахова передвища освіта',
  'Вища освіта',
];

const HOBBY_OPTIONS = [
  { key: 'reading', label: 'Читання' },
  { key: 'sport', label: 'Спорт' },
  { key: 'music', label: 'Музика' },
] as const;

interface UserView {
  name: string;
  email: string;
  education: string;
  birthDate: string;
  address: string;
  hobbies: string[];
  avatarUrl: string;
}

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Додати нового користувача</h1>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form" novalidate>
      <div class="row">
        <label for="name">Ім'я:</label>
        <div>
          <input id="name" formControlName="name" />
          @if (show(form.controls.name)) {
            <small class="error">Ім'я є обов'язковим</small>
          }
        </div>
      </div>

      <div class="row">
        <label for="email">Електронна пошта:</label>
        <div>
          <input id="email" type="email" formControlName="email" />
          @if (show(form.controls.email)) {
            @if (form.controls.email.hasError('required')) {
              <small class="error">Електронна пошта є обов'язковою</small>
            } @else {
              <small class="error">Некоректний формат email</small>
            }
          }
        </div>
      </div>

      <div formGroupName="passwords" class="row">
        <label for="password">Пароль:</label>
        <div>
          <input id="password" type="password" formControlName="password" />
          @if (show(passwords.controls.password)) {
            @if (passwords.controls.password.hasError('required')) {
              <small class="error">Пароль є обов'язковим</small>
            } @else {
              <small class="error">Пароль має містити щонайменше 6 символів</small>
            }
          }
        </div>

        <label for="confirmPassword">Підтвердження пароля:</label>
        <div>
          <input id="confirmPassword" type="password" formControlName="confirmPassword" />
          @if (show(passwords.controls.confirmPassword)) {
            @if (passwords.controls.confirmPassword.hasError('required')) {
              <small class="error">Підтвердіть пароль</small>
            } @else if (passwords.hasError('mismatch')) {
              <small class="error">Паролі не збігаються</small>
            }
          }
        </div>
      </div>

      <fieldset class="row">
        <legend>Освіта:</legend>
        <div>
          @for (opt of educationOptions; track opt) {
            <label class="inline">
              <input type="radio" formControlName="education" [value]="opt" /> {{ opt }}
            </label>
          }
          @if (show(form.controls.education)) {
            <small class="error">Оберіть рівень освіти</small>
          }
        </div>
      </fieldset>

      <div class="row">
        <label for="birthDate">Дата народження:</label>
        <div>
          <input id="birthDate" type="date" formControlName="birthDate" />
          @if (show(form.controls.birthDate)) {
            <small class="error">Дата народження є обов'язковою</small>
          }
        </div>
      </div>

      <div class="row">
        <label for="address">Адреса:</label>
        <div>
          <input id="address" formControlName="address" />
          @if (show(form.controls.address)) {
            <small class="error">Адреса є обов'язковою</small>
          }
        </div>
      </div>

      <fieldset class="row" formGroupName="hobbies">
        <legend>Хобі:</legend>
        <div>
          @for (h of hobbyOptions; track h.key) {
            <label class="inline">
              <input type="checkbox" [formControlName]="h.key" /> {{ h.label }}
            </label>
          }
        </div>
      </fieldset>

      <div class="row">
        <label for="avatar">Аватар:</label>
        <div>
          <input id="avatar" type="file" accept="image/*" (change)="onAvatarChange($event)" />
          @if (show(form.controls.avatar)) {
            <small class="error">Завантажте аватар</small>
          }
        </div>
      </div>

      <div class="row">
        <span></span>
        <div>
          <label class="inline">
            <input type="checkbox" formControlName="agree" /> Я згоден(на) на обробку персональних даних
          </label>
          @if (show(form.controls.agree)) {
            <small class="error">Потрібна згода на обробку даних</small>
          }
        </div>
      </div>

      <div class="row">
        <span></span>
        <div>
          <button type="submit">Додати користувача</button>
        </div>
      </div>
    </form>

    @if (user(); as u) {
      <h2>Дані користувача</h2>
      <img [src]="u.avatarUrl" alt="Аватар" width="120" />
      <ul>
        <li><b>Ім'я:</b> {{ u.name }}</li>
        <li><b>Email:</b> {{ u.email }}</li>
        <li><b>Пароль:</b> ••••••</li>
        <li><b>Освіта:</b> {{ u.education }}</li>
        <li><b>Дата народження:</b> {{ u.birthDate }}</li>
        <li><b>Адреса:</b> {{ u.address }}</li>
        <li><b>Хобі:</b> {{ u.hobbies.length ? u.hobbies.join(', ') : 'не вказано' }}</li>
      </ul>
    }
  `,
  styles: `
    .form { display: grid; gap: 8px; max-width: 640px; }
    .row { display: grid; grid-template-columns: 220px 1fr; gap: 8px; align-items: start; border: 0; padding: 0; margin: 0; }
    .row input:not([type='radio']):not([type='checkbox']) { width: 100%; box-sizing: border-box; }
    .inline { display: block; }
    .error { display: block; color: red; }
  `,
})
export class Registration {
  protected readonly educationOptions = EDUCATION_OPTIONS;
  protected readonly hobbyOptions = HOBBY_OPTIONS;
  protected readonly user = signal<UserView | null>(null);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    passwords: new FormGroup(
      {
        password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      },
      { validators: passwordsMatch },
    ),
    education: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    birthDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hobbies: new FormGroup({
      reading: new FormControl(false, { nonNullable: true }),
      sport: new FormControl(false, { nonNullable: true }),
      music: new FormControl(false, { nonNullable: true }),
    }),
    avatar: new FormControl<File | null>(null, Validators.required),
    agree: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  protected get passwords() {
    return this.form.controls.passwords;
  }

  protected show(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.form.controls.avatar.setValue(file);
    this.form.controls.avatar.markAsDirty();
  }

  protected onSubmit(): void {
    this.form.markAllAsTouched();
    const v = this.form.getRawValue();
    if (this.form.invalid || !v.avatar) {
      return;
    }
    this.user.set({
      name: v.name,
      email: v.email,
      education: v.education,
      birthDate: v.birthDate,
      address: v.address,
      hobbies: HOBBY_OPTIONS.filter((h) => v.hobbies[h.key]).map((h) => h.label),
      avatarUrl: URL.createObjectURL(v.avatar),
    });
  }
}
