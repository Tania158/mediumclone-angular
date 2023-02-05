import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesModule } from '../backendErrorMessages/backendErrorMessages.module';
import { LoadingModule } from "../loading/loading.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    LoadingModule
  ],
  declarations: [
    ArticleFormComponent
  ],
  exports: [
    ArticleFormComponent
  ],

})
export class ArticleFormModule {}