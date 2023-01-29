import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { PersistanceService } from "src/app/shared/services/persistance.service"
import { ArticleInterface } from "src/app/shared/types/article.interface"
import { AddToFavoritesService } from "../../services/addToFavorites.service"
import { addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction } from '../actions/addToFavorites.action';

@Injectable()
export class AddToFavoritesEffect {

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService,
    private persistanceService: PersistanceService,
    private router: Router
  ) { }
  
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const token = this.persistanceService.get('accessToken');
        if (!token) {
          return of(addToFavoritesFailureAction());
        }

        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article })
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction())
          })
        )
      })
    )
  );

  redirectLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(addToFavoritesFailureAction),
      tap(() => {
        this.router.navigateByUrl('/login')
      })
    ),
    {dispatch: false}
  )
}