import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Cararticle, CararticlesService, UserService } from '../shared';

@Injectable()
export class EditableCararticleResolver implements Resolve<Cararticle> {
  constructor(
    private cararticlesService: CararticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.cararticlesService.get(route.params['slug'])
           .map(
             cararticle => {
               if (this.userService.getCurrentUser().username === cararticle.author.username) {
                 return cararticle;
               } else {
                 this.router.navigateByUrl('/');
               }

             }
           )
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
