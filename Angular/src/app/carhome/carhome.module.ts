import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarhomeComponent } from './carhome.component';
import { CarhomeAuthResolver } from './carhome-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'carhome',
    component: CarhomeComponent,
    resolve: {
      isAuthenticated: CarhomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    CarhomeComponent
  ],
  providers: [
    CarhomeAuthResolver
  ]
})
export class CarhomeModule {}
