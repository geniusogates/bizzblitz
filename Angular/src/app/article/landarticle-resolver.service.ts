import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Landarticle, LandarticlesService, UserService } from '../shared';

@Injectable()
export class LandarticleResolver implements Resolve<Landarticle> {
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
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
