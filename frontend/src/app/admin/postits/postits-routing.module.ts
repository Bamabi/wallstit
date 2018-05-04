import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../../core/translate-resolver';
import { PostitsComponent } from './postits.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import * as Guards from './guards';

const routes: Routes = [
  {
    path: '', canActivate: [Guards.PostitsGuard],
    data: {
      code: 'admin.menu.postits.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      {
        path: '', component: PostitsComponent,
        data: {
          code: 'admin.menu.postits.list'
        },
      },
      {
        path: 'new', component: CreateComponent, canActivate: [Guards.PostitsCreateGuard],
        data: {
          code: 'admin.menu.postits.create'
        },
      },
      {
        path: ':id/update', component: EditComponent, canActivate: [Guards.PostitsUpdateGuard],
        data: {
          code: 'admin.menu.postits.update'
        },
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostitsRoutingModule { }
