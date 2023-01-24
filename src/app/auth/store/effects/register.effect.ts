import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AuthService } from '../../services/auth.service';
import { registerAction, registerSuccessAction, registerFailureAction } from '../actions/register.action';
import { catchError, switchMap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => 
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}));
          })
        )
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}