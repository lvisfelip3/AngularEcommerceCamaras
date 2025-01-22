import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatIconModule, 
    RouterLink, 
    CurrencyPipe,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  product = input.required<Product>();

  add = output<Product>();

  addToCart(e: Event){
    e.stopPropagation();
    e.preventDefault();

    this.add.emit(this.product());
  }
}
