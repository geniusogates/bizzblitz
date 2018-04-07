import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models';

import { UserService } from './user.service';

import { ApiService } from './api.service';
import { Profile } from '../models';

@Injectable()
export class ProfilesService {
  currentUser: User;

  constructor (
    private apiService: ApiService,
    private userService: UserService,
  ) {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        
      }
    )
  }

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
           .map((data: {profile: Profile}) => data.profile);
  }

  follow(username: string, userme: string, userother: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow', {userme, userother})
  }

  unfollow(username: string, userme: string, userother: string): Observable<Profile> {
    return this.apiService.deletef('/profiles/' + username + '/follow', {userme, userother})
  }


  /*unfollowF(userme: string, userother: string): Observable<Profile> {
    return this.apiService.post('/profilesf', {userme, userother})
  }*/


  /*postFollow(userme: string, userother: string) {
    console.log('this are credentials for profileService:',userme, userother);
    this.apiService.post('/postfollow', {userme, userother}) 
  }*/

}
