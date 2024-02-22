import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 let auth = inject(AuthService);
 let storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
 
 if(!storedUser.token){
     alert("Neovlasteni pokusaj pristupa sistema");
     auth.logout();
     return false;
 }
  return true;
};
