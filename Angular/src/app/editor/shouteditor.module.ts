import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import {Ng2UploaderModule} from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { ShouteditorComponent } from './shouteditor.component';
import { EditableShoutarticleResolver } from './editable-shoutarticle-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'shouteditor',
    component: ShouteditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shouteditor/:slug',
    component: ShouteditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      shoutarticle: EditableShoutarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    //Ng2UploaderModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [
    ShouteditorComponent
  ],
  providers: [
    EditableShoutarticleResolver
  ]
})
export class ShouteditorModule {}
