import { Profile } from './profile.model';

export class Cararticle {
  slug: string;
  title = '';
  description = '';
  body = '';
  location = '';
  landmark = '';
  phone = '';
  email = '';
  postImage = '';
  postImage1 = '';
  postImage2 = '';
  name1 = '';
  description1 = '';
  price = '';
  model = '';
  year = '';
  mileage = '';
  transmission = '';
  vin = '';
  condition = '';
  license = '';
  privately = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

