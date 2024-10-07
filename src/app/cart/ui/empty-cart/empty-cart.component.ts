import { Component } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [ MatIconModule, MatCardModule, RouterLink],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css'
})
export class EmptyCartComponent {

}
