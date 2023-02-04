import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateArticleCommentResponseInterface } from "../types/createArticleCommentResponse.interface";
import { environment } from "src/environments/environment";
import { ArticleCommentInputInterface } from "../types/articleCommentInput.interface";

@Injectable()
export class CreateArticleCommentService {

  constructor(private http: HttpClient) { }

  createArticleComment(slug: string, commentInput: ArticleCommentInputInterface): Observable<CreateArticleCommentResponseInterface> {
    const url = `${environment.apiUrl}/articles/${slug}/comments`;

    return this.http.post<CreateArticleCommentResponseInterface>(url, { comment: commentInput });
  }
  
}