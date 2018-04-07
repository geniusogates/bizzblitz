import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {NgxPaginationModule} from 'ngx-pagination';





import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
import { BizarticleListComponent, BizarticleMetaComponent, BizarticlePreviewComponent } from './bizarticle-helpers';
import { CararticleListComponent, CararticleMetaComponent, CararticlePreviewComponent } from './cararticle-helpers';
import { ApatarticleListComponent, ApatarticleMetaComponent, ApatarticlePreviewComponent } from './apatarticle-helpers';
import { LandarticleListComponent, LandarticleMetaComponent, LandarticlePreviewComponent } from './landarticle-helpers';
import { ShoutarticleListComponent, ShoutarticleMetaComponent, ShoutarticlePreviewComponent } from './shoutarticle-helpers';
import { FavoriteButtonComponent, BizfavoriteButtonComponent, CarfavoriteButtonComponent, ApatfavoriteButtonComponent, LandfavoriteButtonComponent, ShoutfavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
//import { ArticleModalComponent } from './article-helpers/article-modal/article-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BootstrapModalModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    NgxPaginationModule
    
  ],
  declarations: [
    ArticleListComponent,
    BizarticleListComponent,
    CararticleListComponent,
    ApatarticleListComponent,
    LandarticleListComponent,
    ShoutarticleListComponent,
    ArticleMetaComponent,
    BizarticleMetaComponent,
    CararticleMetaComponent,
    ApatarticleMetaComponent,
    LandarticleMetaComponent,
    ShoutarticleMetaComponent,
    ArticlePreviewComponent,
    BizarticlePreviewComponent,
    CararticlePreviewComponent,
    ApatarticlePreviewComponent,
    LandarticlePreviewComponent,
    ShoutarticlePreviewComponent,
    FavoriteButtonComponent,
    BizfavoriteButtonComponent,
    CarfavoriteButtonComponent,
    ApatfavoriteButtonComponent,
    LandfavoriteButtonComponent,
    ShoutfavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    //ArticleModalComponent
  ],
  exports: [
    ArticleListComponent,
    BizarticleListComponent,
    CararticleListComponent,
    ApatarticleListComponent,
    LandarticleListComponent,
    ShoutarticleListComponent,
    ArticleMetaComponent,
    BizarticleMetaComponent,
    CararticleMetaComponent,
    ApatarticleMetaComponent,
    LandarticleMetaComponent,
    ShoutarticleMetaComponent,
    ArticlePreviewComponent,
    BizarticlePreviewComponent,
    CararticlePreviewComponent,
    ApatarticlePreviewComponent,
    LandarticlePreviewComponent,
    ShoutarticlePreviewComponent,
    //ArticleModalComponent,
    CommonModule,
    FavoriteButtonComponent,
    BizfavoriteButtonComponent,
    CarfavoriteButtonComponent,
    ApatfavoriteButtonComponent,
    LandfavoriteButtonComponent,
    ShoutfavoriteButtonComponent,
    FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule {}
