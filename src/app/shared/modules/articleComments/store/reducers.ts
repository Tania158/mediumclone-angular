import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { ArticleCommentsStateInterface } from '../types/articleCommentsState.interface';
import { getArticleCommentsAction, getArticleCommentsFailureAction, getArticleCommentsSuccesAction } from './action/getArticleComments.action';

const initialState: ArticleCommentsStateInterface = {
  isLoading: false,
  error: null,
  data: null
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
    routerNavigationAction, (): ArticleCommentsStateInterface => initialState
  )
)

export function reducers(state: ArticleCommentsStateInterface, action: Action) {
  return articleCommentsReducer(state, action)
}