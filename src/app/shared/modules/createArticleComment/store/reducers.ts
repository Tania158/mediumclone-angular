import { CreateArticleCommentsStateInterface } from "../types/createArticleCommentState.interface";
import { Action, createReducer, on } from '@ngrx/store';
import { createArticleCommentAction, createArticleCommentFailureAction, createArticleCommentSuccessAction } from "./action/createArticleComment.action";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: CreateArticleCommentsStateInterface = {
  newComment: null,
  validationErrors: null,
  isSubmitting: false
}

const createArticleCommentReducer = createReducer(
  initialState,
  on(
    createArticleCommentAction,
    (state): CreateArticleCommentsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    createArticleCommentSuccessAction,
    (state, action): CreateArticleCommentsStateInterface => ({
      ...state,
      newComment: action.response,
      isSubmitting: false,
      validationErrors: null
    })
  ),
  on(
    createArticleCommentFailureAction,
    (state, action): CreateArticleCommentsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    routerNavigationAction, (): CreateArticleCommentsStateInterface => initialState
  )
)

export function reducers(state: CreateArticleCommentsStateInterface, action: Action) {
  return createArticleCommentReducer(state, action)
}