import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import {VgCoreModule} from 'videogular2/core';
//import {VgControlsModule} from 'videogular2/controls';
//import {VgOverlayPlayModule} from 'videogular2/overlay-play';
//import {VgBufferingModule} from 'videogular2/buffering';

import { ArticleModalComponent } from './article-modal.component';
//import { ArticleCommentComponent } from './article-comment.component';
//import { ArticleResolver } from './article-resolver.service';
//import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../../../shared';

const articleModalRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'modal',
    component: ArticleModalComponent,
    //resolve: {
     // article: ArticleResolver
    //}
  }
]);

@NgModule({
  imports: [
    articleModalRouting,
    SharedModule,
    //VgCoreModule,
    //VgControlsModule,
    //VgOverlayPlayModule,
    //VgBufferingModule
  ],
  declarations: [
    ArticleModalComponent
   //ArticleCommentComponent,
    //MarkdownPipe
  ],

  providers: [
    //ArticleResolver
  ]
})
export class ArticleModalModule {}
