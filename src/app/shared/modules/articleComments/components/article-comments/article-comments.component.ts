import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { getArticleCommentsAction } from '../../store/action/getArticleComments.action';
import { Observable } from 'rxjs';
import { CreateArticleCommentResponseInterface, GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';
import { articleCommentsSelector, errorSelector, isLoadingSelector, isSubmittingSelector, newArticleCommentsSelector, validationErrorsSelector } from '../../store/selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { createArticleCommentAction } from '../../store/action/createArticleComment.action';
import { ArticleCommentsInterface } from '../../types/articleComments.interface';
import { deleteArticleCommentAction } from '../../store/action/deleteArticleComment.action';

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
  newComment$!: Observable<CreateArticleCommentResponseInterface | null>;
  isSubmitting$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  allComments!: ArticleCommentsInterface[];


  form: FormGroup = this.fb.group({
    body: ['']
  });

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initializeValues();
    this.fetchComments();
  }

  fetchComments(): void {
    this.store.dispatch(getArticleCommentsAction({ slug: this.articleSlugProps }));;
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.comments$ = this.store.pipe(select(articleCommentsSelector));
    this.newComment$ = this.store.pipe(select(newArticleCommentsSelector));
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.comments$.subscribe((ArticleCommentsResponse: GetArticleCommentResponseInterface | null) => {
      if (ArticleCommentsResponse?.comments) {
        let allCommentsArr = [];
        for (let i = ArticleCommentsResponse?.comments.length; i--;) {
          allCommentsArr.push(ArticleCommentsResponse?.comments[i]);
        }
        return this.getAllCommentsAfterSubmit(allCommentsArr);
      }
    });
  }

  getAllCommentsAfterSubmit(allCommentsArr: ArticleCommentsInterface[]) {
    this.newComment$.subscribe((newCommentResponse: CreateArticleCommentResponseInterface | null) => {
      if (newCommentResponse?.comment) {
        allCommentsArr.unshift(newCommentResponse.comment);
        this.allComments = allCommentsArr;
      } else {
        this.allComments = allCommentsArr;
      }
    });
  }

  onSubmit(): void {
    this.store.dispatch(createArticleCommentAction({ slug: this.articleSlugProps, commentInput: this.form.value }));
    this.form.reset();
    this.initializeListeners();
  }

  deleteArticle(id: number): void {
    this.store.dispatch(deleteArticleCommentAction({ slug: this.articleSlugProps, id: id }));
    this.getAllCommentsAfterDelete(id);
  }

  getAllCommentsAfterDelete(id: number): void {
    this.allComments = this.allComments.filter(comment => comment.id !== id);
  }

}
