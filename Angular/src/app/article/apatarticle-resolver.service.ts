import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Apatarticle, ApatarticlesService, UserService } from '../shared';

@Injectable()
export class ApatarticleResolver implements Resolve<Apatarticle> {
  constructor(
    private apatarticlesService: ApatarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.apatarticlesService.get(route.params['slug'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
