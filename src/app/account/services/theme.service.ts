import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('theme') ?? 'light')
  );

  updateTheme() {
    this.themeSignal.update((value) => (value === 'dark' ? 'light' : 'dark'));
  }

  constructor() { 
    effect(() => {
      window.localStorage.setItem('theme', JSON.stringify(this.themeSignal()));
    })
  }
}
