import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from '../../store/actions/getArticle.action';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { filter, Observable, map } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { isSubmittingSelector, validationErrorsSelector, isLoadingSelector, articleSelector } from '../../store/selectors';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { updateArticleAction } from '../../store/actions/updateArticle.action';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  slug!: string;
  initialValues$!: Observable<ArticleInputInterface | null>;
  isSubmitting$!: Observable<boolean | null>;
  isLoading$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValue();
    this.fetchData();
  }

  initializeValue(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      }));
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }));
  }
}
