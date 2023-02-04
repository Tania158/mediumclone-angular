import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ArticleCommentInputInterface } from '../../types/articleCommentInput.interface';
import { CreateArticleCommentResponseInterface } from '../../types/createArticleCommentResponse.interface';
import { ActionTypes } from '../actionTypes';

export const createArticleCommentAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS,
  props<{ slug: string; commentInput: ArticleCommentInputInterface }>()
);

export const createArticleCommentSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS_SUCCESS,
  props<{ response: CreateArticleCommentResponseInterface }>()
);

export const createArticleCommentFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_COMMENTS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)