import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ShoutarticleComponent } from './shoutarticle.component';
import { ShoutArticleCommentComponent } from './shoutarticle-comment.component';
import { ShoutarticleResolver } from './shoutarticle-resolver.service';
import { ShoutmarkdownPipe } from './shoutmarkdown.pipe';
import { SharedModule } from '../shared';

const shoutarticleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'shoutarticle/:slug',
    component: ShoutarticleComponent,
    resolve: {
      shoutarticle: ShoutarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    shoutarticleRouting,
    SharedModule
    
  ],
  declarations: [
    ShoutarticleComponent,
    ShoutArticleCommentComponent,
    ShoutmarkdownPipe
  ],

  providers: [
    ShoutarticleResolver
  ]
})
export class ShoutarticleModule {}
