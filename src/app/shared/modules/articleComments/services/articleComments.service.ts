import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { GetArticleCommentResponseInterface } from "../types/getArticleCommentResponse.interface";

@Injectable()
export class ArticleCommentsService {

  constructor(private http: HttpClient) {}

  getArticleComments(slug: string): Observable<GetArticleCommentResponseInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments`;

    return this.http.get<GetArticleCommentResponseInterface>(fullUrl);
  }

  deleteArticleComment(slug: string, id: number): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments/${id}`;

    return this.http.delete<{}>(fullUrl);
  }
}