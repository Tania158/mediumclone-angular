import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from "@angular/router";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.action";

@Injectable()
export class LoginEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) { }

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}));
          })
        )
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        console.log('success');
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )
}