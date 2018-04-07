import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { EditorvComponent } from './editorv.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editorv',
    component: EditorvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editorv/:slug',
    component: EditorvComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    //Ng2UploaderModule,
    ProgressbarModule.forRoot(),
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [
    EditorvComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})
export class EditorvModule {}
