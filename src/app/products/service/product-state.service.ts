import { Injectable, inject } from '@angular/core'; 
import { Product } from '../../shared/interfaces/interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductsService } from '../service/products.service';
import { catchError, map, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';

interface State {
  products: Product[];
  status: 'pending' | 'loading' | 'success' | 'error';
  page: number;
  searchTerm: string | null;
}

interface SearchProductsAction {
  type: 'searchProducts';
  payload: { products: Product[] };
}

@Injectable()
export class ProductStateService {
  private productsService = inject(ProductsService);

  private initialState: State = {
    products: [],
    status: 'loading' as const,
    page: 1,
    searchTerm: null,
  };

  changePage = new Subject<number>();
  searchProducts = new Subject<SearchProductsAction>();

  private productsSubject = new Subject<Product[]>();
  products$ = this.productsSubject.asObservable();

  loadProducts = this.changePage.pipe(
    startWith(1),
    switchMap((page) => this.productsService.getProducts(page)),
    map((products) => ({ products, status: 'success' as const })),
    catchError(() => {
      return of({
        products: [],
        status: 'error' as const,
      });
    }),
  );

  search(searchTerm: string): Observable<Product[]> {
    return this.productsService.searchProducts(searchTerm).pipe(
      tap((products) => {
        this.productsSubject.next(products);
        this.searchProducts.next({
          type: 'searchProducts',
          payload: { products },
        });
      })
    );
  }

  filterByCategory(categoryId: number | null): Observable<Product[]> {
    return this.productsService.getProductsByCategory(categoryId as number).pipe(
      map((products) => {
        this.searchProducts.next({
          type: 'searchProducts',
          payload: { products },
        });
        return products;
      }),
      catchError(() => {
        console.error('Error al filtrar productos por categoría');
        return of([]);
      })
    );
  }

  filterByMaxPrice(maxPrice: number | null): Observable<Product[]> {
    return this.productsService.getProductsByMaxPrice(maxPrice as number).pipe(
      map((products) => {
        this.searchProducts.next({
          type: 'searchProducts',
          payload: { products },
        });
        return products;
      }),
      catchError(() => {
        console.error('Error al filtrar productos por precio');
        return of([]);
      })
    );
  }

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      searchProducts: (state, actions$: Observable<SearchProductsAction>) => actions$.pipe(
        map((action) => ({
          ...state,
          products: action.payload.products,
          status: 'success' as const,
        }))
      ),
    },
    sources: [
      this.changePage.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProducts,
    ],
  });
}