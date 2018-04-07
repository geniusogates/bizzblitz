import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApathomeComponent } from './apathome.component';
import { ApathomeAuthResolver } from './apathome-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'apathome',
    component: ApathomeComponent,
    resolve: {
      isAuthenticated: ApathomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    ApathomeComponent
  ],
  providers: [
    ApathomeAuthResolver
  ]
})
export class ApathomeModule {}
