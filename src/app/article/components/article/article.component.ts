import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { getArticleAction } from '../../store/action/getArticle.actions';
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/selectors';
import { deleteArticleAction } from '../../store/action/deleteArticle.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  slug!: string;
  article$!: Observable<ArticleInterface | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      [
        this.store.pipe(select(articleSelector)),
        this.store.pipe(select(currentUserSelector))
      ]
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        }
      )
    )
  }

  initializeListeners(): void {
    this.article$ = this.store.pipe(select(articleSelector));
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))
  }

}
