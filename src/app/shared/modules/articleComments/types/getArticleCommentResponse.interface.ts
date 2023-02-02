import { ArticleCommentsInterface } from "./articleComments.interface";

export interface GetArticleCommentResponseInterface {
  comments: ArticleCommentsInterface[]
}

export interface CreateArticleCommentResponseInterface {
  comment: ArticleCommentsInterface
}