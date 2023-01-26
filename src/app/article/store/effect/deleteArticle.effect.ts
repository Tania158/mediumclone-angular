import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccesAction } from '../action/deleteArticle.actions';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Injectable()
export class DeleteArticleEffect {

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) { }

  deleteArticle$ = createEffect(() => 
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccesAction()
          }),
          catchError(() => {
            return of(deleteArticleFailureAction());
          })
        )
      })
    )
  );

  redirectAfterDelete$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteArticleSuccesAction),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
    {dispatch: false}
  )
}