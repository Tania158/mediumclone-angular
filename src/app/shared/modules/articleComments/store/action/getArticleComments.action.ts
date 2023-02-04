import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';

export const getArticleCommentsAction = createAction(
  ActionTypes.GET_ARTICLE_COMMENTS,
  props<{ slug: string }>()
);

export const getArticleCommentsSuccesAction = createAction(
  ActionTypes.GET_ARTICLE_COMMENTS_SUCCESS,
  props<{ response: GetArticleCommentResponseInterface}>()
);

export const getArticleCommentsFailureAction = createAction(
  ActionTypes.GET_ARTICLE_COMMENTS_FAILURE
)
