import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostitsService } from '../shared/postits/postit.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateResolver } from '../core/translate-resolver';

const routes: Routes = [
  {
    path: '',
    data: {
      code: 'menu.dashboard.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      { path: '', component: DashboardComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [PostitsService]
})
export class DashboardModule { }
