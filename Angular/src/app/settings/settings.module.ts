import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
//import { Ng2UploaderModule } from 'ng2-uploader';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { SettingsComponent } from './settings.component';
import { AuthGuard, SharedModule } from '../shared';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting,
    FormsModule,
    //Ng2UploaderModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
