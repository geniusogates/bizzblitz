import { Profile } from './profile.model';

export class Shoutarticle {
  slug: string;
  shoutname = '';
  shoutdescription = '';
  shoutlocation = '';
  shoutbody = '';
  shoutphone = '';
  shoutemail = '';
  shoutimage = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}