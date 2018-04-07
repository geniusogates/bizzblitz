import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandhomeComponent } from './landhome.component';
import { LandhomeAuthResolver } from './landhome-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'landhome',
    component: LandhomeComponent,
    resolve: {
      isAuthenticated: LandhomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    LandhomeComponent
  ],
  providers: [
    LandhomeAuthResolver
  ]
})
export class LandhomeModule {}
