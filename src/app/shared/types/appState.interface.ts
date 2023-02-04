import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../modules/feed/types/feedState.interface';
import { PopularTagsStateInterface } from '../modules/popularTags/types/popularTagsState.interface';
import { ArticleStateInterface } from '../../article/types/articleState.interface';
import { CreateArticleStateInterface } from 'src/app/createArticle/types/createArticleState.interface';
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface';
import { SettingsStateInterface } from '../../settings/types/settingsState.interface';
import { UserProfileStateInterface } from 'src/app/userProfile/types/userProfileState.interface';
import { ArticleCommentsStateInterface } from '../modules/articleComments/types/articleCommentsState.interface';
import { CreateArticleCommentsStateInterface } from '../modules/createArticleComment/types/createArticleCommentState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  article: ArticleStateInterface;
  popularTags: PopularTagsStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
  userProfile: UserProfileStateInterface;
  comments: ArticleCommentsStateInterface;
  createComment: CreateArticleCommentsStateInterface
}