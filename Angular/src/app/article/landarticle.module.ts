import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { LandarticleComponent } from './landarticle.component';
import { LandArticleCommentComponent } from './landarticle-comment.component';
import { LandarticleResolver } from './landarticle-resolver.service';
import { LandmarkdownPipe } from './landmarkdown.pipe';
import { SharedModule } from '../shared';

const landarticleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'landarticle/:slug',
    component: LandarticleComponent,
    resolve: {
      landarticle: LandarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    landarticleRouting,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    LandarticleComponent,
    LandArticleCommentComponent,
    LandmarkdownPipe
  ],

  providers: [
    LandarticleResolver
  ]
})
export class LandarticleModule {}
