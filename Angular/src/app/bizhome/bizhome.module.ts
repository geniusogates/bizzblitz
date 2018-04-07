import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BizhomeComponent } from './bizhome.component';
import { BizhomeAuthResolver } from './bizhome-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'bizhome',
    component: BizhomeComponent,
    resolve: {
      isAuthenticated: BizhomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    BizhomeComponent
  ],
  providers: [
    BizhomeAuthResolver
  ]
})
export class BizhomeModule {}
