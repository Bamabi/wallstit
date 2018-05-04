import { NgModule } from '@angular/core';
import * as _ from 'underscore';

import { SharedModule } from '../../shared/shared.module';
import { PostitsRoutingModule } from './postits-routing.module';
import { PostitsComponent } from './postits.component';
import { PostitsService } from '../../shared/postit/postit.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CreateOrUpdateComponent } from './create-or-update/create-or-update.component';
import { USERS_GUARD_PROVIDERS } from './guards';

@NgModule({
  imports: [
    SharedModule,
    PostitsRoutingModule
  ],
  declarations: [
    PostitsComponent,
    CreateComponent,
    EditComponent,
    CreateOrUpdateComponent,
  ],
  providers: [
    PostitsService,
    USERS_GUARD_PROVIDERS,
  ]
})
export class PostitsModule { }
