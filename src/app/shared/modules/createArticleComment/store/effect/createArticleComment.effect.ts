import { Injectable } from "@angular/core";
import { CreateArticleCommentService } from "../../services/createArticleComment.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createArticleCommentAction, createArticleCommentFailureAction, createArticleCommentSuccessAction } from "../action/createArticleComment.action";
import { switchMap, map, catchError, of } from 'rxjs';
import { CreateArticleCommentResponseInterface } from "../../types/createArticleCommentResponse.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CreateArticleCommentEffect {

  constructor(private actions$: Actions, private createArticleCommentService: CreateArticleCommentService) { }

  createArticleComment$ = createEffect(() => 
    this.actions$.pipe(
      ofType(createArticleCommentAction),
      switchMap(({ slug, commentInput }) => {
        return this.createArticleCommentService.createArticleComment(slug, commentInput).pipe(
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