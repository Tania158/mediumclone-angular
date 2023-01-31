import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { followButtonAction } from '../../store/actions/followButton.action';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  @Input('isFollowing') isFollowingProps!: boolean;
  @Input('profileSlug') profileSlugProps!: string;

  isFollowing!: boolean;
  userName!: string;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.isFollowing = this.isFollowingProps;
    this.userName = this.profileSlugProps;
  }

  follow(): void {
    this.store.dispatch(followButtonAction({ isFollow: this.isFollowing, slug: this.profileSlugProps }));

    this.isFollowing = !this.isFollowing;
  }
}
