import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { ArticleService } from '../../../shared/services/article.service';
import { getArticleAction, getArticleFailureAction, getArticleSuccesAction } from '../action/getArticle.actions';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Injectable()
export class GetArticleEffect {

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) { }

  getArticle$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccesAction({article})
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        )
      })
    )
  );
}