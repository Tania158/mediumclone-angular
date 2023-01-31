import { PopularTagsStateInterface } from "../types/popularTagsState.interface";
import { createReducer, on, Action } from '@ngrx/store';
import { getPopularTagsAction, getPopularTagsSuccessAction, getPopularTagsFailureAction } from './action/getPopularTags.actions';
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on (routerNavigatedAction, (): PopularTagsStateInterface => initialState)

)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}