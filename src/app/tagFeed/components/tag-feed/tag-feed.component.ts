import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss']
})
export class TagFeedComponent implements OnInit {
  tagName!: string | null;
  apiUrl!: string;
  

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.tagName = this.route.snapshot.paramMap.get('slug');
    this.apiUrl = `/articles?tag=${this.tagName}`;

    this.route.params.subscribe((params: Params) => {
      console.log(params);

      this.tagName = this.route.snapshot.paramMap.get('slug');
      this.apiUrl = `/articles?tag=${this.tagName}`;
    })
  }
}
