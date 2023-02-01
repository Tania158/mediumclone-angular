import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { GetArticleCommentResponseInterface } from "../types/getArticleCommentResponse.interface";
import { ArticleCommentInputInterface } from '../types/ArticleCommentInput.interface';

@Injectable()
export class ArticleCommentsService {

  constructor(private http: HttpClient) {}

  getArticleComments(slug: string): Observable<GetArticleCommentResponseInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments`;

    return this.http.get<GetArticleCommentResponseInterface>(fullUrl);
  }

  createArticleComment(slug: string, commentInput: ArticleCommentInputInterface): Observable<GetArticleCommentResponseInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments`;

    return this.http.post<GetArticleCommentResponseInterface>(fullUrl, {comment: commentInput});
  }
}