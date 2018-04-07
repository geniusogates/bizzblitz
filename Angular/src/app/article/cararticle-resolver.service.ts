import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Cararticle, CararticlesService, UserService } from '../shared';

@Injectable()
export class CararticleResolver implements Resolve<Cararticle> {
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
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
