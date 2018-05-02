import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationModule } from '../authentication/authentication.module';
import { KeysPipe } from './keys.pipe';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';

import {
  MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatTabsModule,
  MatSnackBarModule, MatSelectModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatCardModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { PostitComponent } from './postits/postit.component';
import { PostitsComponent } from './postits/list/postits.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AuthenticationModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CdkTableModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [
    KeysPipe,
    ConfirmModalComponent,
    PostitComponent,
    PostitsComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AuthenticationModule,
    KeysPipe,
    FlexLayoutModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CdkTableModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    PostitComponent,
    PostitsComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
    PostitComponent,
    PostitsComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  };
}
