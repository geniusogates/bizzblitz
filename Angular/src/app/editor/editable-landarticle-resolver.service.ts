import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Landarticle, LandarticlesService, UserService } from '../shared';

@Injectable()
export class EditableLandarticleResolver implements Resolve<Landarticle> {
  constructor(
    private landarticlesService: LandarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.landarticlesService.get(route.params['slug'])
           .map(
             landarticle => {
               if (this.userService.getCurrentUser().username === landarticle.author.username) {
                 return landarticle;
               } else {
                 this.router.navigateByUrl('/');
               }

             }
           )
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
