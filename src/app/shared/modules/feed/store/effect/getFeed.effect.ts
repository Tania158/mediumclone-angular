import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import { FeedService } from "../../services/feed.service";
import { getFeedAction, getFeedSuccesAction, getFeedFailureAction } from '../action/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) { }

  getFeed$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccesAction({feed})
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        )
      })
    )
  );
}