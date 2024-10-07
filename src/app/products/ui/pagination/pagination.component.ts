import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../service/product-state.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  productState = inject(ProductStateService);

  changePage(){
    const page = this.productState.state.page() + 1
    this.productState.changePage.next(page);
  }

}
