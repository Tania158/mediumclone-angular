import { createAction, props } from "@ngrx/store";
import { ProfileInterface } from "src/app/shared/types/profile.interface";
import { ActionTypes } from '../actionTypes';

export const followButtonAction = createAction(
  ActionTypes.FOLLOW,
  props<{isFollow: boolean; slug: string}>()
)

export const followButtonSuccessAction = createAction(
  ActionTypes.FOLLOW_SUCCESS,
  props<{profile: ProfileInterface}>()
)
export const followButtonFailureAction = createAction(
  ActionTypes.FOLLOW_FAILURE
)