import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { RouterModule } from '@angular/router';
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule],
  declarations: [CreateArticleComponent],
  exports: [CreateArticleComponent],
})
export class CreateArticleModule {}