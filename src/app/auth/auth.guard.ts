import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está logeado
  if (authService.isLoggedIn()) {
    const user = authService.getCurrentUser(); // Obtiene los datos del usuario actual
    
    // Verifica si el usuario tiene el rol de administrador
    if (user?.rol === 'admin') {
      return true;
    } else {
      router.navigate(['/unauthorized']); // Redirige si no es admin
      return false;
    }
  } else {
    router.navigate(['/login']); // Redirige si no está logeado
    return false;
  }
};