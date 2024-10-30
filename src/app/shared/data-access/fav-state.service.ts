import { inject, Injectable, Signal } from "@angular/core";
import { Product } from "../interfaces/interfaces"; // Asumiendo que `Product` está definido aquí
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";

interface State {
    products: Product[];
    loaded: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class FavoriteStateService {
    private storageService = inject(StorageService);

    private initialState: State = {
        products: [],
        loaded: false
    };

    loadFavorites = this.storageService.loadProductsFav().pipe(
        map((products) => ({ products, loaded: true }))
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadFavorites],
        actionSources: {
            add: (state, actions$: Observable<Product>) => actions$.pipe(
                map((product) => this.add(state, product))
            ),
            remove: (state, actions$: Observable<number>) => actions$.pipe(
                map((id) => this.remove(state, id))
            )
        },
        effects: (state) => ({
            save: () => {
                if (state.loaded()) {
                    this.storageService.saveProductsFav(state.products());
                }
            }
        })
    });

    private add(state: Signal<State>, product: Product) {
        const isInFavorites = state().products.some((favProduct) => favProduct.id === product.id);
        if (!isInFavorites) {
            return { products: [...state().products, product] };
        }
        return { products: state().products };
    }

    private remove(state: Signal<State>, id: number) {
        return {
            products: state().products.filter((product) => product.id !== id),
        };
    }
}
