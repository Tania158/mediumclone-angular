import { Component, Input } from '@angular/core';
import { PopularTagType } from 'src/app/shared/types/popularTagType.interface';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  @Input('tags') tagsProps!: PopularTagType[];
}
