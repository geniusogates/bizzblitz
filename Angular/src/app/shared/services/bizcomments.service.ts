import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Comment } from '../models';


@Injectable()
export class BizcommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
    .post(
      `/bizarticles/${slug}/comments`,
      { comment: { body: payload } }
    ).map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/bizarticles/${slug}/comments`)
           .map(data => data.comments);
  }

  destroy(commentId, bizarticleSlug) {
    return this.apiService
           .delete(`/bizarticles/${bizarticleSlug}/comments/${commentId}`);
  }

}