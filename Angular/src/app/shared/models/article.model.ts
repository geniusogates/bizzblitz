import { Profile } from './profile.model';

export class Article {
  slug: string;
  title = '';
  description = '';
  body = '';
  postImage = '';
  postImage1 = '';
  postVideo = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
