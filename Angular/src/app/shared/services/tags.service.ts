import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class TagsService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<[string]> {
    return this.apiService.get('/tags')
           .map(data => data.tags);
  }


  getAllB(): Observable<[string]> {
    return this.apiService.get('/btags')
           .map(data => data.tags);
  }


  getAllC(): Observable<[string]> {
    return this.apiService.get('/ctags')
           .map(data => data.tags);
  }


  getAllP(): Observable<[string]> {
    return this.apiService.get('/ptags')
           .map(data => data.tags);
  }


  getAllL(): Observable<[string]> {
    return this.apiService.get('/ltags')
           .map(data => data.tags);
  }

}
