import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShouthomeComponent } from './shouthome.component';
import { ShouthomeAuthResolver } from './shouthome-auth-resolver.service';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'shouthome',
    component: ShouthomeComponent,
    resolve: {
      isAuthenticated: ShouthomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    ShouthomeComponent
  ],
  providers: [
    ShouthomeAuthResolver
  ]
})
export class ShouthomeModule {}
