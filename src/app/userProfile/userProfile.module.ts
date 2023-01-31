import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from "@ngrx/effects";
import { GetUserProfileEffect } from "./store/effects/getUserProfile.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { UserProfileService } from './services/userProfile.service';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FollowButtonModule } from "../shared/modules/followButton/followButton.module";

const routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule,
    FollowButtonModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule {}