import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateResolver } from '../core/translate-resolver';
import { AdminComponent } from './admin.component';
import { AdminDashboardGuard } from './admin-dashboard-guard';
import { PostitsComponent } from '../shared/postits/list/postits.component';

const routes: Routes = [
  {
    path: '', canActivate: [AdminDashboardGuard],
    data: {
      code: 'admin.menu.users.title'
    },
    resolve: {
      title: TranslateResolver
    },
    children: [
      { path: '', component: AdminComponent },
      { path: 'postits', component: PostitsComponent },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'languages', loadChildren: './languages/languages.module#LanguagesModule' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
