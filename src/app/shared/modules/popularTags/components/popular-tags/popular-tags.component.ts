import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { getPopularTagsAction } from '../../store/action/getPopularTags.actions';
import { Observable } from 'rxjs';
import { PopularTagType } from '../../../../types/popularTagType.interface';
import { popularTagsSelector, isLoadingSelector, errorSelector } from '../../store/selectors';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {
  pupularTags$!: Observable<PopularTagType[] | null>;
  isLoading$!: Observable<boolean>;
  errors$!: Observable<string | null>

  constructor(private store: Store<AppStateInterface>) { }
  
  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.pupularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.errors$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
