import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CreateArticleCommentComponent } from "./components/create-article-comment/create-article-comment.component";
import { RouterModule } from "@angular/router";
import { CreateArticleCommentService } from "./services/createArticleComment.service";
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleCommentEffect } from "./store/effect/createArticleComment.effect";
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { BackendErrorMessagesModule } from "../backendErrorMessages/backendErrorMessages.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ArticleCommentModule } from "../articleComments/articleComments.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([CreateArticleCommentEffect]),
    StoreModule.forFeature('createComment', reducers),
    BackendErrorMessagesModule,
    ReactiveFormsModule,
    ArticleCommentModule
  ],
  declarations: [CreateArticleCommentComponent],
  exports: [CreateArticleCommentComponent],
  providers: [CreateArticleCommentService]
})
export class CreateArticleCommentModule {}