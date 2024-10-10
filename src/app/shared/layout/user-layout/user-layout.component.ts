import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../ui/footer/footer.component';
import { HeaderComponent } from '../../ui/header/header.component';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {
  opened = false;
  isLoggedIn = false;
  userName = '';
  userPhoto: string | undefined = '';
  userRol = '';
  mode: 'side' | 'over' = 'side';

  constructor(
    private auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
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

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
      });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }
}
