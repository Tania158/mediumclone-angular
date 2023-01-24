import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeedService {
  private apiUrl: string = 'https://api.realworld.io/api';

  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = this.apiUrl + url;

    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}