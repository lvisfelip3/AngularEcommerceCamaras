import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header/header.component';
import { FooterAdminComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [HeaderAdminComponent, 
    FooterAdminComponent, 
    RouterOutlet, 
    MatIconModule, 
    MatSidenavModule, 
    MatButtonModule, 
    MatMenuModule, 
    RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit{
  opened = true;
  mode: 'side' | 'over' = 'side';

  constructor(
    private auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
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
  }

}
