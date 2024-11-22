import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CartStateService } from '@shared/data-access/cart-state.service';

@Component({
  selector: 'app-cart-mobile-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule
  ],
  templateUrl: './cart-mobile-button.component.html',
  styleUrl: './cart-mobile-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartMobileButtonComponent {
  cartService = inject(CartStateService).state;
}
