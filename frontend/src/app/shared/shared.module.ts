import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationModule } from '../authentication/authentication.module';
import { KeysPipe } from './keys.pipe';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import {
  MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatTabsModule, MatDatepickerModule,
  MatSnackBarModule, MatSelectModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatCardModule, MatDialogModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { PostitComponent } from './postit/postit.component';

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
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  declarations: [
    KeysPipe,
    ConfirmModalComponent,
    PostitComponent,
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
    MatDatepickerModule,
    MatMomentDateModule,
    PostitComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
    PostitComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  };
}
