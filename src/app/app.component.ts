import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { ThemeService } from '@account/services/theme.service';

registerLocaleData(localeEsCl, 'es-CL');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'AngularEcommerceCamaras';
  themeService = inject(ThemeService)
}
