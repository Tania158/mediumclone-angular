import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { PopularTagsService } from '../../services/popularTags.service';
import { getPopularTagsAction, getPopularTagsSuccessAction, getPopularTagsFailureAction } from '../action/getPopularTags.actions';
import { PopularTagType } from '../../../../types/popularTagType.interface';

@Injectable()
export class GetPopularTagsEffect {

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) { }

  getPopularTags$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags})
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        )
      })
    )
  );
}