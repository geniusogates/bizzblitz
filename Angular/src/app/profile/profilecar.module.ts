import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileCararticlesComponent } from './profile-cararticles.component';
import { ProfilecarComponent } from './profilecar.component';
import { ProfileCarfavoritesComponent } from './profile-carfavorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';

const profilecarRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profilecar/:username',
    component: ProfilecarComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileCararticlesComponent
      },
      {
        path: 'carfavorites',
        component: ProfileCarfavoritesComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    profilecarRouting,
    SharedModule
  ],
  declarations: [
    ProfileCararticlesComponent,
    ProfilecarComponent,
    ProfileCarfavoritesComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfilecarModule {}
