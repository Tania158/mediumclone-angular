import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { getArticleCommentsAction } from '../../store/action/getArticleComments.action';
import { map, Observable, Subscription } from 'rxjs';
import { GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';
import { articleCommentsSelector, errorSelector, isLoadingSelector } from '../../store/selectors';
import { ArticleCommentsInterface } from '../../types/articleComments.interface';
import { deleteArticleCommentAction } from '../../store/action/deleteArticleComment.action';
import { newArticleCommentsSelector } from '../../../createArticleComment/store/selectors';
import { CreateArticleCommentResponseInterface } from '../../../createArticleComment/types/createArticleCommentResponse.interface';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit, OnDestroy {

  @Input('articleSlug') articleSlugProps!: string;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  comments!: Subscription;
  newComment!: Subscription;
  isAuthorName$!: Observable<string | null>;
  allComments!: ArticleCommentsInterface[];


  constructor(private store: Store<AppStateInterface>) { }
  
  ngOnInit(): void {
    this.fetchComments();
    this.initializeValues();
    this.initializeListeners();
    this.getAllCommentsAfterSubmit();
  }

  ngOnDestroy(): void {
    this.comments.unsubscribe();
    this.newComment.unsubscribe();
  }

  fetchComments(): void {
    this.store.dispatch(getArticleCommentsAction({ slug: this.articleSlugProps }));;
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthorName$ = this.store.pipe(select(currentUserSelector)).pipe(
      map((currentUser: CurrentUserInterface | null) => {
        if (!currentUser) {
          return null;
        }
        return currentUser.username;
      })
    );
  }

  initializeListeners(): void {
    this.comments = this.store
      .pipe(select(articleCommentsSelector))
      .subscribe((articleCommentsResponse: GetArticleCommentResponseInterface | null) => {
      if (articleCommentsResponse?.comments) {
        let allCommentsArr = [];
        for (let i = articleCommentsResponse?.comments.length; i--;) {
          allCommentsArr.push(articleCommentsResponse?.comments[i]);
        }
        this.allComments = allCommentsArr;
      }
    });
  }

  getAllCommentsAfterSubmit() {
    this.newComment = this.store
      .pipe(select(newArticleCommentsSelector))
      .subscribe((resp: CreateArticleCommentResponseInterface | null) => {
        if (resp?.comment) {
          this.allComments.unshift(resp?.comment);
        }
    })
  }

  deleteArticle(id: number): void {
    this.store.dispatch(deleteArticleCommentAction({ slug: this.articleSlugProps, id: id }));
    this.getAllCommentsAfterDelete(id);
  }

  getAllCommentsAfterDelete(id: number): void {
    this.allComments = this.allComments.filter(comment => comment.id !== id);
  }
}
