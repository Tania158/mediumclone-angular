import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ArticleCommentsService } from "../../services/articleComments.service";
import { deleteArticleCommentAction, deleteArticleCommentFailureAction, deleteArticleCommentSuccesAction } from "../action/deleteArticleComment.action";

@Injectable()
export class DeleteArticleCommentEffect {

  constructor(
    private actions$: Actions,
    private articleCommentsService: ArticleCommentsService
  ) { }

  deleteArticleComment$ = createEffect(() => 
    this.actions$.pipe(
      ofType(deleteArticleCommentAction),
      switchMap(({slug, id}) => {
        return this.articleCommentsService.deleteArticleComment(slug, id).pipe(
          map(() => {
            return deleteArticleCommentSuccesAction()
          }),
          catchError(() => {
            return of(deleteArticleCommentFailureAction());
          })
        )
      })
    )
  );
}