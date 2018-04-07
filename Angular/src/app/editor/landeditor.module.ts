import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { LandeditorComponent } from './landeditor.component';
import { EditableLandarticleResolver } from './editable-landarticle-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'landeditor',
    component: LandeditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'landeditor/:slug',
    component: LandeditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      landarticle: EditableLandarticleResolver
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
    LandeditorComponent
  ],
  providers: [
    EditableLandarticleResolver
  ]
})
export class LandeditorModule {}
