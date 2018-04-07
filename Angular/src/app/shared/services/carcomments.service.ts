import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Comment } from '../models';


@Injectable()
export class CarcommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
    .post(
      `/cararticles/${slug}/comments`,
      { comment: { body: payload } }
    ).map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/cararticles/${slug}/comments`)
           .map(data => data.comments);
  }

  destroy(commentId, cararticleSlug) {
    return this.apiService
           .delete(`/cararticles/${cararticleSlug}/comments/${commentId}`);
  }

}