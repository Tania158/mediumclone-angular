import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArticleService as SharedArticleService} from '../shared/services/article.service';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/effect/getArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../shared/modules/errorMessage/errorMessage.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { TagListModule } from '../shared/modules/tagList/tagList.module';
import { ArticleService } from './services/article.service';
import { DeleteArticleEffect } from './store/effect/deleteArticle.effect';
import { AddToFavoritesModule } from "../shared/modules/addToFavorites/addToFavorites.module";
import { FollowButtonModule } from "../shared/modules/followButton/followButton.module";

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
    AddToFavoritesModule,
    FollowButtonModule
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {}
