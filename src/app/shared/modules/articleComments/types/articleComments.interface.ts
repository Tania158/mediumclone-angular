import { ProfileInterface } from '../../../types/profile.interface';

export interface ArticleCommentsInterface {
  author: ProfileInterface;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}