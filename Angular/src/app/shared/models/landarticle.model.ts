import { Profile } from './profile.model';

export class Landarticle {
  slug: string;
  title = '';
  description = '';
  body = '';
  location = '';
  phone = '';
  email = '';
  postImage = '';
  postImage1 = '';
  postImage2 = '';
  name1 = '';
  description1 = '';
  price1 = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
