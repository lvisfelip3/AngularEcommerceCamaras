import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductItemCart, Product } from "../interfaces/interfaces";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private cookieService = inject(CookieService);
    private readonly COOKIE_CART_NAME = 'cartProducts';
    private readonly COOKIE_FAV_NAME = 'favProducts';

    loadProductsCart(): Observable<ProductItemCart[]> {
        const rawProducts = this.cookieService.get(this.COOKIE_CART_NAME);
        return of(rawProducts ? JSON.parse(atob(rawProducts)) : []);
    }

    saveProductsCart(products: ProductItemCart[]): void {
        const encodedProducts = btoa(JSON.stringify(products));
        this.cookieService.set(this.COOKIE_CART_NAME, encodedProducts, { path: '/', sameSite: 'Strict' });
    }

    loadProductsFav(): Observable<Product[]> {
        const rawProducts = this.cookieService.get(this.COOKIE_FAV_NAME);
        return of(rawProducts ? JSON.parse(atob(rawProducts)) : []);
    }

    saveProductsFav(products: Product[]): void {
        const encodedProducts = btoa(JSON.stringify(products));
        this.cookieService.set(this.COOKIE_FAV_NAME, encodedProducts, { path: '/', sameSite: 'Strict' });
    }
}
