import { computed, effect, inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/interfaces";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";
import { SnackBarService } from "@shared/ui/snack-bar.service";

interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CartStateService {
    private readonly storageService = inject(StorageService);
    snackBarService = inject(SnackBarService);

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
            ),
            clear: () => {
                return {
                    products: [],
                    loaded: true
                };
            }
        }),
        actionSources: {
            add: (state, actions$: Observable<ProductItemCart>) => 
                actions$.pipe(map((product) => this.add(state, product))),
            
            remove: (state, actions$: Observable<number>) => 
                actions$.pipe(map((id) => this.remove(state, id))),
            
            update: (state, actions$: Observable<ProductItemCart>) => 
                actions$.pipe(map((product) => this.update(state, product))),
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
    
        if (existingProductIndex !== -1) {
            const existingProduct = currentProducts[existingProductIndex];
            const newQuantity = existingProduct.quantity + 1;
    
            if (newQuantity > product.product.stock) {
                this.snackBarService.showSnackBar('No hay suficiente stock disponible', 'OK');
                return {};
            }
    
            currentProducts[existingProductIndex] = {
                ...existingProduct,
                quantity: newQuantity,
            };
            
            this.snackBarService.showSnackBar('Producto agregado', 'OK');
            return { products: currentProducts };
        }
    
        if (product.quantity > product.product.stock) {
            this.snackBarService.showSnackBar('No hay suficiente stock disponible', 'OK');
            return {};
        }
        this.snackBarService.showSnackBar('Producto agregado', 'OK');
        return {
            products: [...currentProducts, { ...product, quantity: 1 }],
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
                    if (product.quantity > productInCart.product.stock) {
                        const mensaje = `Stock insuficiente para el producto: ${product.product.id}`;
                        return {
                            ...productInCart,
                            quantity: productInCart.product.stock,
                            message: mensaje
                        };
                    }
                    return product.quantity <= 0 
                        ? null 
                        : { ...productInCart, quantity: product.quantity};
                }
                return productInCart;
            })
            .filter((product): product is ProductItemCart => product !== null);
        
        return { products: updatedProducts };
    }

    
}