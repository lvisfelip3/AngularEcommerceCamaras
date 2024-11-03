import { ChangeDetectionStrategy, Component} from '@angular/core';
import { NotFoundIconComponent } from './notFound-icon.component';

@Component({
  selector: 'app-empty-product',
  standalone: true,
  imports: [
    NotFoundIconComponent
  ],
  templateUrl: './empty-product.component.html',
  styleUrl: './empty-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyProductComponent {
}
