import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { BizeditorComponent } from './bizeditor.component';
import { EditableBizarticleResolver } from './editable-bizarticle-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'bizeditor',
    component: BizeditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bizeditor/:slug',
    component: BizeditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      bizarticle: EditableBizarticleResolver
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
    BizeditorComponent
  ],
  providers: [
    EditableBizarticleResolver
  ]
})
export class BizeditorModule {}
