import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileBizarticlesComponent } from './profile-bizarticles.component';
import { ProfilebizComponent } from './profilebiz.component';
import { ProfileBizfavoritesComponent } from './profile-bizfavorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';

const profilebizRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profilebiz/:username',
    component: ProfilebizComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileBizarticlesComponent
      },
      {
        path: 'bizfavorites',
        component: ProfileBizfavoritesComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    profilebizRouting,
    SharedModule
  ],
  declarations: [
    ProfileBizarticlesComponent,
    ProfilebizComponent,
    ProfileBizfavoritesComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfilebizModule {}
