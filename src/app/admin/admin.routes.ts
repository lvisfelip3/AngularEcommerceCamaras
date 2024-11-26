import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    },
    {
        path: 'categorias',
        loadComponent: () => import('./maintainers/category/category.component').then(m => m.CategoryComponent),
    },
    {
        path: 'productos',
        loadComponent: () => import('./maintainers/products/products.component').then(m => m.ProductComponent),
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./maintainers/users/user.component').then(m => m.UserComponent),
    },
    {
        path: 'envios',
        loadComponent: () => import('./shipping/shipping.component').then(m => m.ShippingComponent),
    }
] as Routes;