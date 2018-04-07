import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { EditorComponent } from '../editor/editor.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    //path: 'register',
    //component: AuthComponent,
    //canActivate: [NoAuthGuard]
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    //FlashMessagesModule.forRoot()
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
