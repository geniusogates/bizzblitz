import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileApatarticlesComponent } from './profile-apatarticles.component';
import { ProfileapatComponent } from './profileapat.component';
import { ProfileApatfavoritesComponent } from './profile-apatfavorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';

const profileapatRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profileapat/:username',
    component: ProfileapatComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileApatarticlesComponent
      },
      {
        path: 'apatfavorites',
        component: ProfileApatfavoritesComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    profileapatRouting,
    SharedModule
  ],
  declarations: [
    ProfileApatarticlesComponent,
    ProfileapatComponent,
    ProfileApatfavoritesComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfileapatModule {}
