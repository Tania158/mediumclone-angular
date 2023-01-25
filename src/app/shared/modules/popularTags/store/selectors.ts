import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../types/appState.interface';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';


export const popularTagsFeatureSelectors = (
  state: AppStateInterface
): PopularTagsStateInterface => state.popularTags;

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);

export const errorSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);