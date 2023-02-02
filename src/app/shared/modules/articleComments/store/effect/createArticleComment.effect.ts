import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { ArticleCommentsService } from "../../services/articleComments.service"
import { CreateArticleCommentResponseInterface } from "../../types/getArticleCommentResponse.interface"
import { createArticleCommentAction, createArticleCommentFailureAction, createArticleCommentSuccessAction } from '../action/createArticleComment.action';

@Injectable()
export class CreateArticleCommentEffect {

  constructor(
    private actions$: Actions,
    private articleCommentsService: ArticleCommentsService
  ) {}

  createArticleComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleCommentAction),
      switchMap(({slug, commentInput}) => {
        return this.articleCommentsService.createArticleComment(slug, commentInput).pipe(
          map((response: CreateArticleCommentResponseInterface) => {
            return createArticleCommentSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleCommentFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )
}
