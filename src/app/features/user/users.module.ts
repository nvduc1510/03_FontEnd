import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { CustomValidateComponent } from './validate/custom-validate/custom-validate.component';
import { MessageComponent } from './validate/message/message.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    UserListComponent,
    AddComponent,
    CustomValidateComponent,
    MessageComponent,
    ConfirmComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
