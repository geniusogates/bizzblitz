import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Bizarticle, BizarticlesService, UserService } from '../shared';

@Injectable()
export class EditableBizarticleResolver implements Resolve<Bizarticle> {
  constructor(
    private bizarticlesService: BizarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.bizarticlesService.get(route.params['slug'])
           .map(
             bizarticle => {
               if (this.userService.getCurrentUser().username === bizarticle.author.username) {
                 return bizarticle;
               } else {
                 this.router.navigateByUrl('/');
               }

             }
           )
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
