import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ArticleService as SharedArticleService } from "src/app/shared/services/article.service";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffect {

  constructor(
    private actions$: Actions,
    private getArticleService: SharedArticleService
  ) {}

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.getArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article })
          }),
          catchError(() => {
            return of(
              getArticleFailureAction()
            )
          })
        )
      })
    )
  );
}
