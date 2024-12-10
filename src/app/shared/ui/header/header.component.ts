import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartStateService } from '@shared/data-access/cart-state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@auth/auth.service';
import { User } from '@shared/interfaces/interfaces';
import { ThemeTogglerComponent } from "@account/ui/theme-toggler/theme-toggler.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { AuthDialogComponent } from '@auth/index'
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchSaleComponent } from '@shared/components/dialog-search-sale/dialog-search-sale.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    RouterLinkActive,
    MatMenuModule, 
    ThemeTogglerComponent,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  cartState = inject(CartStateService).state
  isLoggedIn = false;
  user: User | null = null

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private auth: AuthService, 
    private router: Router,
    private dialog: MatDialog
  ) { 
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.auth.getUserData().subscribe((userData: User | null) => {
      this.user = userData;
    });
  }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '500px',
    });
  }

  openOrderDialog(): void {
    this.dialog.open(DialogSearchSaleComponent, {
      width: '500px',
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }
}
