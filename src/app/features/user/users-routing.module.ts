import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemErrorComponent } from 'src/app/shared/component/error/system-error.component';
import { UserListComponent } from './list/user-list.component';
import { AuthorizeGuard } from '../../shared/auth/authorize.guard';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'user', redirectTo: 'user/list', pathMatch: 'full'},
  { path: 'user/list', component: UserListComponent, canActivate: [AuthorizeGuard] },
  { path: 'user/add_edit', component: AddComponent, canActivate: [AuthorizeGuard] },  
  { path: '**', component: SystemErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
