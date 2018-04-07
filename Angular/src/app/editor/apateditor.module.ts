import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { ApateditorComponent } from './apateditor.component';
import { EditableApatarticleResolver } from './editable-apatarticle-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'apateditor',
    component: ApateditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apateditor/:slug',
    component: ApateditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      apatarticle: EditableApatarticleResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    FormsModule,
    //Ng2UploaderModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [
    ApateditorComponent
  ],
  providers: [
    EditableApatarticleResolver
  ]
})
export class ApateditorModule {}
