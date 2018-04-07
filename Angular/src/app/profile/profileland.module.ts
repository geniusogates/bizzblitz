import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileLandarticlesComponent } from './profile-landarticles.component';
import { ProfilelandComponent } from './profileland.component';
import { ProfileLandfavoritesComponent } from './profile-landfavorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';

const profilelandRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profileland/:username',
    component: ProfilelandComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileLandarticlesComponent
      },
      {
        path: 'landfavorites',
        component: ProfileLandfavoritesComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    profilelandRouting,
    SharedModule
  ],
  declarations: [
    ProfileLandarticlesComponent,
    ProfilelandComponent,
    ProfileLandfavoritesComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfilelandModule {}
