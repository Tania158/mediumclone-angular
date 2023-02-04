import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { CreateArticleCommentsStateInterface } from "../types/createArticleCommentState.interface";

export const createArticleCommentsFeatureSelector = (
  state: AppStateInterface
): CreateArticleCommentsStateInterface => state.createComment;

export const isSubmittingSelector = createSelector(
  createArticleCommentsFeatureSelector,
  (commentState: CreateArticleCommentsStateInterface) => commentState.isSubmitting
);

export const newArticleCommentsSelector = createSelector(
  createArticleCommentsFeatureSelector,
  (commentState: CreateArticleCommentsStateInterface) => commentState.newComment
);

export const validationErrorsSelector = createSelector(
  createArticleCommentsFeatureSelector,
  (commentState: CreateArticleCommentsStateInterface) => commentState.validationErrors
);