import { FeedStateInterface } from '../types/feedState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { getFeedAction, getFeedSuccesAction, getFeedFailureAction } from './action/getFeed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccesAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
)

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action)
}