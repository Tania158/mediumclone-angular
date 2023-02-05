import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { createArticleCommentAction } from '../../store/action/createArticleComment.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';


@Component({
  selector: 'app-create-article-comment',
  templateUrl: './create-article-comment.component.html',
  styleUrls: ['./create-article-comment.component.scss']
})
export class CreateArticleCommentComponent implements OnInit {

  @Input('articleSlug') articleSlugProps!: string;

  isSubmitting$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  articleSlug!: string;

  form: FormGroup = this.fb.group({
    body: ['']
  });

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.articleSlug = this.articleSlugProps;
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    this.store.dispatch(createArticleCommentAction({ slug: this.articleSlugProps, commentInput: this.form.value }));
    this.form.reset();
  }
}

