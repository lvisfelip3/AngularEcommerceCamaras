import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header/header.component';
import { FooterAdminComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [HeaderAdminComponent, FooterAdminComponent, RouterOutlet, MatIconModule, MatSidenavModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  opened = true;

}
