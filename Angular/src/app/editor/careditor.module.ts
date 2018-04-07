import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { CareditorComponent } from './careditor.component';
import { EditableCararticleResolver } from './editable-cararticle-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'careditor',
    component: CareditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'careditor/:slug',
    component: CareditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      cararticle: EditableCararticleResolver
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
    CareditorComponent
  ],
  providers: [
    EditableCararticleResolver
  ]
})
export class CareditorModule {}
