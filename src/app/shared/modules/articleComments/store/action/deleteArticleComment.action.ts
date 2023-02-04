import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const deleteArticleCommentAction = createAction(
  ActionTypes.DELETE_ARTICLE_COMMENTS,
  props<{ slug: string, id: number }>()
);

export const deleteArticleCommentSuccesAction = createAction(
  ActionTypes.DELETE_ARTICLE_COMMENTS_SUCCESS
);

export const deleteArticleCommentFailureAction = createAction(
  ActionTypes.DELETE_ARTICLE_COMMENTS_FAILURE
)