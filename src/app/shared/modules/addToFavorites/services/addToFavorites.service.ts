import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../../../types/article.interface';
import { GetArticleResponseInterface } from '../../../types/getArticleResponse';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.post<GetArticleResponseInterface>(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.delete<GetArticleResponseInterface>(url).pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}