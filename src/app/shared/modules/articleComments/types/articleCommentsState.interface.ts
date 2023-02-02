import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CreateArticleCommentResponseInterface, GetArticleCommentResponseInterface } from "./getArticleCommentResponse.interface";

export interface ArticleCommentsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetArticleCommentResponseInterface | null;
  newComment: CreateArticleCommentResponseInterface | null;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}