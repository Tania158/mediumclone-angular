import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { ArticleCommentsStateInterface } from '../types/articleCommentsState.interface';
import { getArticleCommentsAction, getArticleCommentsFailureAction, getArticleCommentsSuccesAction } from './action/getArticleComments.action';
import { createArticleCommentAction, createArticleCommentFailureAction, createArticleCommentSuccessAction } from './action/createArticleComment.action';

const initialState: ArticleCommentsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
  isSubmitting: false,
  validationErrors: null,
  newComment: null
}

const articleCommentsReducer = createReducer(
  initialState,
  on(
    getArticleCommentsAction,
    (state): ArticleCommentsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleCommentsSuccesAction,
    (state, action): ArticleCommentsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.response
    })
  ),
  on(
    getArticleCommentsFailureAction,
    (state): ArticleCommentsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createArticleCommentAction,
    (state): ArticleCommentsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    createArticleCommentSuccessAction,
    (state, action): ArticleCommentsStateInterface => ({
      ...state,
      newComment: action.response,
      isSubmitting: false,
      validationErrors: null
    })
  ),
  on(
    createArticleCommentFailureAction,
    (state, action): ArticleCommentsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    routerNavigationAction, (): ArticleCommentsStateInterface => initialState
  )
)

export function reducers(state: ArticleCommentsStateInterface, action: Action) {
  return articleCommentsReducer(state, action)
}