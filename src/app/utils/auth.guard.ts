import { inject } from '@angular/core';
import UserService from '../services/user.service';
import { of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { fromSignal } from './fromSignal';

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return fromSignal(userService.getSignal())
    .pipe(tap(user => {
        return user ? true : router.navigate(['login']);
    }));
//   if (userService.getUser()) {
//     return of(true);
//   }
//   return router.navigate(['login']);
};
