import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const user = authService.getCurrentUser();
    
    if (user?.rol === 'admin') {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};