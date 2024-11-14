import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {
  product = input.required<Product>()
}
