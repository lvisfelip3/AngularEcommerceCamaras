import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}
