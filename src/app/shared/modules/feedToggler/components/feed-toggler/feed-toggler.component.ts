import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { isAnonymousSelector, isLoggedInSelector } from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps!: string | null;

  islLoggedIn$!: Observable<boolean | null>;
  isAnonymous$!: Observable<boolean | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.islLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
  }
  
}
