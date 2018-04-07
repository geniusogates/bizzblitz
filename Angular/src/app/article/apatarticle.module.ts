import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { ApatarticleComponent } from './apatarticle.component';
import { ApatArticleCommentComponent } from './apatarticle-comment.component';
import { ApatarticleResolver } from './apatarticle-resolver.service';
import { ApatmarkdownPipe } from './apatmarkdown.pipe';
import { SharedModule } from '../shared';

const apatarticleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'apatarticle/:slug',
    component: ApatarticleComponent,
    resolve: {
      apatarticle: ApatarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    apatarticleRouting,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    ApatarticleComponent,
    ApatArticleCommentComponent,
    ApatmarkdownPipe
  ],

  providers: [
    ApatarticleResolver
  ]
})
export class ApatarticleModule {}
