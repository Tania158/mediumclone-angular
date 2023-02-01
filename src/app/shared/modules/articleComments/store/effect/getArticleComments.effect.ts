import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { ArticleCommentsService } from "../../services/articleComments.service";
import { getArticleCommentsAction, getArticleCommentsFailureAction, getArticleCommentsSuccesAction } from "../action/getArticleComments.action";
import { GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';

@Injectable()
export class GetArticleCommentsEffect {

  constructor(
    private actions$: Actions,
    private articleCommentsService: ArticleCommentsService
  ) { }

  getArticleComments$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getArticleCommentsAction),
      switchMap(({ slug }) => {
        return this.articleCommentsService.getArticleComments(slug).pipe(
          map((response: GetArticleCommentResponseInterface) => {
            return getArticleCommentsSuccesAction({response})
          }),
          catchError(() => {
            return of(getArticleCommentsFailureAction());
          })
        )
      })
    )
  );
}