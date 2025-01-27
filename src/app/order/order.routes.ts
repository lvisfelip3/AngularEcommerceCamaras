import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./order.component').then(m => m.OrderComponent)
    },
    {
        path: 'checkout/:orderRef',
        loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
    },
    {
        path: 'confirmed/:orderRef',
        loadComponent: () => import('./confirmed/confirmed.component').then(m => m.ConfirmedComponent)
    },
    {
        path: 'paymentError/:error',
        loadComponent: () => import('./ui/payment-error/payment-error.component').then(m => m.PaymentErrorComponent)
    }

] as Routes;