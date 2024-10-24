import { Component } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [ 
    MatIconModule, 
    MatButtonModule,
    RouterLink,
    IconComponent
  ],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css'
})
export class EmptyCartComponent {

}
