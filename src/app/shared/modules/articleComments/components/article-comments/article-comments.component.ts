import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { getArticleCommentsAction } from '../../store/action/getArticleComments.action';
import { Observable, Subscription } from 'rxjs';
import { GetArticleCommentResponseInterface } from '../../types/getArticleCommentResponse.interface';
import { articleCommentsSelector, errorSelector, isLoadingSelector } from '../../store/selectors';
import { ArticleCommentsInterface } from '../../types/articleComments.interface';
import { deleteArticleCommentAction } from '../../store/action/deleteArticleComment.action';
import { newArticleCommentsSelector } from '../../../createArticleComment/store/selectors';
import { CreateArticleCommentResponseInterface } from '../../../createArticleComment/types/createArticleCommentResponse.interface';

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
  newComment!: Subscription;

  allComments!: ArticleCommentsInterface[];


  constructor(private store: Store<AppStateInterface>) { }
  
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
    this.comments$ = this.store.pipe(select(articleCommentsSelector));
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.comments$.subscribe((articleCommentsResponse: GetArticleCommentResponseInterface | null) => {
      if (articleCommentsResponse?.comments) {
        let allCommentsArr = [];
        for (let i = articleCommentsResponse?.comments.length; i--;) {
          allCommentsArr.push(articleCommentsResponse?.comments[i]);
        }
        return this.getAllCommentsAfterSubmit(allCommentsArr);
      }
    });
  }

  getAllCommentsAfterSubmit(allCommentsArr: ArticleCommentsInterface[]) {
    this.newComment = this.store
      .pipe(select(newArticleCommentsSelector))
      .subscribe((resp: CreateArticleCommentResponseInterface | null) => {
        if (resp?.comment) {
          allCommentsArr.unshift(resp?.comment);
          this.allComments = allCommentsArr;
        } else {
          this.allComments = allCommentsArr;
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
