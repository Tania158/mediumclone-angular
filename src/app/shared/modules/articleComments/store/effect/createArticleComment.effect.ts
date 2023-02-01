import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap } from "rxjs"
import { ArticleCommentsService } from "../../services/articleComments.service"
import { GetArticleCommentResponseInterface } from "../../types/getArticleCommentResponse.interface"
import { createArticleCommentAction, createArticleCommentFailureAction, createArticleCommentSuccessAction } from '../action/createArticleComment.action';

@Injectable()
export class CreateArticleCommentEffect {

  constructor(
    private actions$: Actions,
    private articleCommentsService: ArticleCommentsService,
    private router: Router
  ) {}

  createArticleComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleCommentAction),
      switchMap(({slug, commentInput}) => {
        return this.articleCommentsService.createArticleComment(slug, commentInput).pipe(
          map((response: GetArticleCommentResponseInterface) => {
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
