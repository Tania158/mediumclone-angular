import { Component, Input } from '@angular/core';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('errors') errorsProps!: BackendErrorsInterface | null;
}