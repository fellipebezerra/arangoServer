import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
