import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { CararticleComponent } from './cararticle.component';
import { CarArticleCommentComponent } from './cararticle-comment.component';
import { CararticleResolver } from './cararticle-resolver.service';
import { CarmarkdownPipe } from './carmarkdown.pipe';
import { SharedModule } from '../shared';

const cararticleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'cararticle/:slug',
    component: CararticleComponent,
    resolve: {
      cararticle: CararticleResolver
    }
  }
]);

@NgModule({
  imports: [
    cararticleRouting,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    CararticleComponent,
    CarArticleCommentComponent,
    CarmarkdownPipe
  ],

  providers: [
    CararticleResolver
  ]
})
export class CararticleModule {}
