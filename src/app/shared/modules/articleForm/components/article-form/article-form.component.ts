import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface | null;
  @Input('isSubmitting') isSubmittingProps!: boolean | null;
  @Input('errors') errorsProps!: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.initialValuesProps !== null) {
      this.form = this.fb.group({
        title: this.initialValuesProps.title,
        description: this.initialValuesProps.description,
        body: this.initialValuesProps.body,
        tagList: this.initialValuesProps.tagList.join(' ')
      });
    }
  }

  onSubmit(): void {
    this.form.value.tagList = this.form.value.tagList.split(' ');
    this.articleSubmitEvent.emit(this.form.value);
  }
}
