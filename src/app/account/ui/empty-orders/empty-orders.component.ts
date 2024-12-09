import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotFoundIconComponent } from '@products/ui/empty-product/notFound-icon.component';

@Component({
  selector: 'app-empty-orders',
  standalone: true,
  imports: [
    NotFoundIconComponent
  ],
  templateUrl: './empty-orders.component.html',
  styleUrl: './empty-orders.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyOrdersComponent {

}
