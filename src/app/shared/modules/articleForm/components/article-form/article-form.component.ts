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
  @Input('isLoading') isLoadingProps!: boolean | null;
  @Input('errors') errorsProps!: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;
  tagList!: string[];

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
        tagList: ''
      });
      this.tagList = this.initialValuesProps.tagList;
    }
  }

  deleteTag(deleteTag: string): void {
    this.tagList = this.tagList.filter((tag: string) => tag !== deleteTag);
  }

  initializeFormTagList(): void {
    if (this.form.value.tagList) {
      this.form.value.tagList = this.tagList.concat(this.form.value.tagList.split(' '));
    } else {
      this.form.value.tagList = this.tagList;
    }
  }

  onSubmit(): void {
    this.initializeFormTagList();
    this.articleSubmitEvent.emit(this.form.value);
  }
}
