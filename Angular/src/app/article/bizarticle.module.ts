import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { BizarticleComponent } from './bizarticle.component';
import { BizArticleCommentComponent } from './bizarticle-comment.component';
import { BizarticleResolver } from './bizarticle-resolver.service';
import { BizmarkdownPipe } from './bizmarkdown.pipe';
import { SharedModule } from '../shared';

const bizarticleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'bizarticle/:slug',
    component: BizarticleComponent,
    resolve: {
      bizarticle: BizarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    bizarticleRouting,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    BizarticleComponent,
    BizArticleCommentComponent,
    BizmarkdownPipe
  ],

  providers: [
    BizarticleResolver
  ]
})
export class BizarticleModule {}
