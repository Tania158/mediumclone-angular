import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { ProfileInterface } from "src/app/shared/types/profile.interface";
import { FollowButtonService } from "../../services/followButton.service";
import { followButtonAction, followButtonFailureAction, followButtonSuccessAction } from '../actions/followButton.action';

@Injectable()
export class FollowButtonEffect {

  constructor(
    private actions$: Actions,
    private followButtonService: FollowButtonService,
    private persistanceService: PersistanceService,
    private router: Router
  ) { }
  
  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followButtonAction),
      switchMap(({ isFollow, slug }) => {
        const token = this.persistanceService.get('accessToken');
        if (!token) {
          return of(followButtonFailureAction());
        }

        const profile$ = isFollow
          ? this.followButtonService.unfollow(slug)
          : this.followButtonService.follow(slug)
        return profile$.pipe(
          map((profile: ProfileInterface) => {
            return followButtonSuccessAction({ profile })
          }),
          catchError(() => {
            return of(followButtonFailureAction())
          })
        )
      })
    )
  );

  redirectLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(followButtonFailureAction),
      tap(() => {
        this.router.navigateByUrl('/login')
      })
    ),
    {dispatch: false}
  )
}