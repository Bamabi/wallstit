import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardGuard } from './admin-dashboard-guard';
import { PostitsService } from '../shared/postits/postit.service';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent
  ],
  providers: [AdminDashboardGuard, PostitsService]
})
export class AdminModule { }
