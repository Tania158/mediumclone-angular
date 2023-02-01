import { createAction, props } from "@ngrx/store"
import { ActionTypes } from "../actionTypes"
import { ArticleCommentInputInterface } from '../../types/ArticleCommentInput.interface';
import { GetArticleCommentResponseInterface } from "../../types/getArticleCommentResponse.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";


export const createArticleCommentAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS,
  props<{ slug: string; commentInput: ArticleCommentInputInterface }>()
)

export const createArticleCommentSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS_SUCCESS,
  props<{response: GetArticleCommentResponseInterface}>()
)

export const createArticleCommentFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
