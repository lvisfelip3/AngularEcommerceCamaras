import { computed, effect, inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/interfaces";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";

interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CartStateService {
    private readonly storageService = inject(StorageService);

    private readonly initialState: State = {
        products: [],
        loaded: false
    };

    private readonly loadProducts = this.storageService.loadProductsCart().pipe(
        map((products) => ({ products, loaded: true }))
    );

    readonly state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts],
        selectors: (state) => ({
            count: computed(() => 
                state().products.reduce(
                    (acc, product) => acc + product.quantity, 
                    0
                )
            ),
            price: computed(() => 
                state().products.reduce(
                    (acc, product) => acc + product.product.precio * product.quantity, 
                    0
                )
            )
        }),
        actionSources: {
            add: (state, actions$: Observable<ProductItemCart>) => 
                actions$.pipe(map((product) => this.add(state, product))),
            
            remove: (state, actions$: Observable<number>) => 
                actions$.pipe(map((id) => this.remove(state, id))),
            
            update: (state, actions$: Observable<ProductItemCart>) => 
                actions$.pipe(map((product) => this.update(state, product)))
        }
    });

    constructor() {
        effect(() => {
            if (this.state.loaded()) {
                this.storageService.saveProductsCart(this.state.products());
            }
        }, { allowSignalWrites: true });
    }

    private add(state: Signal<State>, product: ProductItemCart): Partial<State> {
        const currentProducts = [...state().products];
        const existingProductIndex = currentProducts.findIndex(
            (productInCart) => productInCart.product.id === product.product.id
        );

        if (existingProductIndex === -1) {
            return {
                products: [...currentProducts, { ...product, quantity: 1 }],
            };
        }

        currentProducts[existingProductIndex] = {
            ...currentProducts[existingProductIndex],
            quantity: currentProducts[existingProductIndex].quantity + 1
        };

        return {
            products: currentProducts,
        };
    }

    private remove(state: Signal<State>, id: number): Partial<State> {
        return {
            products: state().products.filter(
                (product) => product.product.id !== id
            ),
        };
    }

    private update(state: Signal<State>, product: ProductItemCart): Partial<State> {
        const updatedProducts = state().products
            .map((productInCart) => {
                if (productInCart.product.id === product.product.id) {
                    return product.quantity <= 0 
                        ? null 
                        : { ...productInCart, quantity: product.quantity };
                }
                return productInCart;
            })
            .filter((product): product is ProductItemCart => product !== null);

        return { products: updatedProducts };
    }
}