import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { ArticleCommentsStateInterface } from '../types/articleCommentsState.interface';

export const articleCommentsFeatureSelector = (
  state: AppStateInterface
): ArticleCommentsStateInterface => state.comments;

export const isLoadingSelector = createSelector(
  articleCommentsFeatureSelector,
  (commentsState: ArticleCommentsStateInterface) => commentsState.isLoading
);

export const errorSelector = createSelector(
  articleCommentsFeatureSelector,
  (commentsState: ArticleCommentsStateInterface) => commentsState.error
);

export const articleCommentsSelector = createSelector(
  articleCommentsFeatureSelector,
  (commentsState: ArticleCommentsStateInterface) => commentsState.data
);