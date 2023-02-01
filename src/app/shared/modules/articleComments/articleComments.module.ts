import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArticleCommentsComponent } from './components/article-comments/article-comments.component';
import { RouterModule } from '@angular/router';
import { ArticleCommentsService } from "./services/articleComments.service";
import { EffectsModule } from '@ngrx/effects';
import { GetArticleCommentsEffect } from './store/effect/getArticleComments.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ErrorMessageModule } from "../errorMessage/errorMessage.module";
import { LoadingModule } from "../loading/loading.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetArticleCommentsEffect]),
    StoreModule.forFeature('comments', reducers),
    ErrorMessageModule,
    LoadingModule,
    ReactiveFormsModule,
  ],
  declarations: [ArticleCommentsComponent],
  exports: [ArticleCommentsComponent],
  providers: [ArticleCommentsService]
})
export class ArticleCommentModule {}