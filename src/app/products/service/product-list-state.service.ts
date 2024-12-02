import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/interfaces/interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductsService } from '../service/products.service';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

interface State {
  product: Product | null;
  status: 'pending' | 'loading' | 'success' | 'error';
  error: string;
}

@Injectable()
export class ProductDetailStateService {
  private readonly productsService = inject(ProductsService);

  private readonly initialState: State = {
    product: null,
    status: 'pending',
    error: '',
  };

  readonly state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getByName: (_state, $: Observable<string>) => $.pipe(
        tap(() => ({ status: 'loading' as const })),
        switchMap((name) => 
          this.productsService.getProductByName(name).pipe(
            map((data) => ({ 
              product: data, 
              status: 'success' as const 
            })),
            catchError((error) => of({ 
              product: null, 
              status: 'error' as const,
              error: error.message || 'Error al cargar el producto'
            }))
          )
        )
      )
    }
  });
}