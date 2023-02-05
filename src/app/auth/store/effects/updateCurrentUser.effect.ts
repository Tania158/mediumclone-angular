import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpErrorResponse } from "@angular/common/http";
import { updateCurrentUserAction, updateCurrentUserSuccessAction, updateCurrentUserFailureAction } from '../actions/updateCurrentUser.action';

@Injectable()
export class updateCurrentUserEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  updateCurrentUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ request }) => {
        return this.authService.updateCurrentUser(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateCurrentUserFailureAction({errors: errorResponse.error.errors}));
          })
        )
      })
    )
  );
}