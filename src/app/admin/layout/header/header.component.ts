import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderAdminComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}
