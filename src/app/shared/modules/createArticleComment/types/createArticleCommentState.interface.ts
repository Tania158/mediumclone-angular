import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CreateArticleCommentResponseInterface } from "./createArticleCommentResponse.interface";

export interface CreateArticleCommentsStateInterface {
  newComment: CreateArticleCommentResponseInterface | null;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}