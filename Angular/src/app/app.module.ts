import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
//import {SingleMediaPlayer} from './single-media-player';
//import { FlashMessagesModule } from 'angular2-flash-messages';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';


import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { BizarticleModule } from './article/bizarticle.module';
import { CararticleModule } from './article/cararticle.module';
import { ApatarticleModule } from './article/apatarticle.module';
import { LandarticleModule } from './article/landarticle.module';
import { ShoutarticleModule } from './article/shoutarticle.module';
import { AuthModule } from './auth/auth.module';
import { ContinueModule } from './auth/continue.module';
import { RegisterModule } from './auth/register.module';
import { EditorModule } from './editor/editor.module';
import { EditorvModule } from './editor/editorv.module';
import { BizeditorModule } from './editor/bizeditor.module';
import { CareditorModule } from './editor/careditor.module';
import { ApateditorModule } from './editor/apateditor.module';
import { LandeditorModule } from './editor/landeditor.module';
import { ShouteditorModule } from './editor/shouteditor.module';
import { HomeModule } from './home/home.module';
import { BizhomeModule } from './bizhome/bizhome.module';
import { CarhomeModule } from './carhome/carhome.module';
import { ApathomeModule } from './apathome/apathome.module';
import { LandhomeModule } from './landhome/landhome.module';
import { ShouthomeModule } from './shouthome/shouthome.module';
import { ProfileModule } from './profile/profile.module';
import { ProfilebizModule } from './profile/profilebiz.module';
import { ProfilecarModule } from './profile/profilecar.module';
import { ProfileapatModule } from './profile/profileapat.module';
import { ProfilelandModule } from './profile/profileland.module';
import { SettingsModule } from './settings/settings.module';
import { ArticleModalModule } from './shared/article-helpers/article-modal/article-modal.module';
import {
  ApiService,
  ArticlesService,
  BizarticlesService,
  CararticlesService,
  ApatarticlesService,
  LandarticlesService,
  ShoutarticlesService,
  AuthGuard,
  AuthService,
  CommentsService,
  BizcommentsService,
  CarcommentsService,
  ApatcommentsService,
  LandcommentsService,
  ShoutcommentsService,
  FooterComponent,
  HeaderComponent,
  JwtService,
  ProfilesService,
  SharedModule,
  TagsService,
  UserService,
  ModalService
} from './shared';
import { SearchPipe } from './pipes/search.pipe';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    ArticleModule,
    BizarticleModule,
    CararticleModule,
    ApatarticleModule,
    LandarticleModule,
    ShoutarticleModule,
    AuthModule,
    ContinueModule,
    RegisterModule,
    EditorModule,
    EditorvModule,
    BizeditorModule,
    CareditorModule,
    ApateditorModule,
    LandeditorModule,
    ShouteditorModule,
    HomeModule,
    BizhomeModule,
    CarhomeModule,
    ApathomeModule,
    LandhomeModule,
    ShouthomeModule,
    ProfileModule,
    ProfilebizModule,
    ProfilecarModule,
    ProfileapatModule,
    ProfilelandModule,
    ArticleModalModule,
    rootRouting,
    SharedModule,
    SettingsModule,
    //Ng2UploaderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    //FlashMessagesModule.forRoot(),
    BootstrapModalModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    Ng2CloudinaryModule,
    FileUploadModule,
    NgxPaginationModule
  ],
  providers: [
    ApiService,
    ArticlesService,
    BizarticlesService,
    CararticlesService,
    ApatarticlesService,
    LandarticlesService,
    ShoutarticlesService,
    AuthGuard,
    AuthService,
    CommentsService,
    BizcommentsService,
    CarcommentsService,
    ApatcommentsService,
    LandcommentsService,
    ShoutcommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
