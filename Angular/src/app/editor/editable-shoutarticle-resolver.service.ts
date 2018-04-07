import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Shoutarticle, ShoutarticlesService, UserService } from '../shared';

@Injectable()
export class EditableShoutarticleResolver implements Resolve<Shoutarticle> {
  constructor(
    private shoutarticlesService: ShoutarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.shoutarticlesService.get(route.params['slug'])
           .map(
             shoutarticle => {
               if (this.userService.getCurrentUser().username === shoutarticle.author.username) {
                 return shoutarticle;
               } else {
                 this.router.navigateByUrl('/');
               }

             }
           )
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
