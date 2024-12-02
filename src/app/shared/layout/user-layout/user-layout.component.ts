import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@shared/ui/footer/footer.component';
import { HeaderComponent } from '@shared/ui/header/header.component';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@auth/auth.service';
import { ThemeService } from '@account/services/theme.service';
import { ThemeTogglerComponent } from "@account/ui/theme-toggler/theme-toggler.component";
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '@auth/index';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    CommonModule,
    ThemeTogglerComponent
],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  opened = false;
  isLoggedIn = false;
  userName = '';
  userPhoto: string | undefined = '';
  userRol = '';
  mode: 'side' | 'over' = 'side';

  theme = inject(ThemeService);

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.auth.getUserData().subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.nombre;
        this.userPhoto = user.imagen;
        this.userRol = user.rol;
      }
    });
  }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '500px',
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }
}
