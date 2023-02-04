import { GetArticleCommentResponseInterface } from "./getArticleCommentResponse.interface";

export interface ArticleCommentsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetArticleCommentResponseInterface | null;
}