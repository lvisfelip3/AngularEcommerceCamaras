import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  state = inject(CartStateService).state;
}
