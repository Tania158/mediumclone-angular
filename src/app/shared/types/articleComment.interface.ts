import { ProfileInterface } from "./profile.interface";

export interface ArticleCommentInterface {
  author: ProfileInterface;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}