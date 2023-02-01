import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { getArticleCommentsAction } from '../../store/action/getArticleComments.action';
import { Observable } from 'rxjs';
import { GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';
import { articleCommentsSelector, errorSelector, isLoadingSelector } from '../../store/selectors';
import { ArticleCommentInputInterface } from '../../types/ArticleCommentInput.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {

  @Input('articleSlug') articleSlugProps!: string;
  @Input('isAuthor') isAuthorProps!: boolean | null;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  comments$!: Observable<GetArticleCommentResponseInterface | null>;

  form: FormGroup = this.fb.group({
    body: ['']
  });

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initializeValues();
    this.fetchFeed();
    this.initializeForm()
  }
  fetchFeed(): void {
    this.store.dispatch(getArticleCommentsAction({ slug: this.articleSlugProps }));;
  }
  initializeValues(): void {
    this.comments$ = this.store.pipe(select(articleCommentsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }
  initializeForm(): void {
    if (this.form !== null) {
      console.log(this.form.value)
    }
  }
  onSubmit(): void {}

}
