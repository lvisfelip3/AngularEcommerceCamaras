import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/interfaces/interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductsService } from '../service/products.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

interface State {
  product: Product | null;
  status: 'pending' | 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductDetailStateService {
  private productsService = inject(ProductsService);

  private initialState: State = {
    product: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $:Observable<string>) => $.pipe(
        switchMap((id) => this.productsService.getProduct(id)),
        map((data) => ({ product: data, status: 'success' as const })),
        catchError(() => of({ product: null, status: 'error' as const })),
      )
    }
  });
}
