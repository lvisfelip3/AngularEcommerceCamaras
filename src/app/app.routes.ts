import { Routes } from '@angular/router';
import { authGuard } from '@auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@shared/layout/user-layout/user-layout.component'),
        children: [
            { path: 'home', loadChildren: () => import('./home/home.routes') },
            { path: 'catalogo', loadChildren: () => import('./products/product.routes') },
            { path: 'carrito', loadChildren: () => import('./cart/cart.routes') },
            { path: 'pedidos', loadChildren: () => import('./order/order.routes') },
            { path: 'account', loadChildren: () => import('./account/account.routes'), canActivate: [authGuard] },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@admin/layout/admin-layout/admin-layout.component'),
        children: [
            { path: '', loadChildren: () => import('./admin/admin.routes') },
        ],
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];