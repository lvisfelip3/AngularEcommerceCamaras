import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '@account/services/theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeTogglerComponent {
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.updateTheme();
  }

}
