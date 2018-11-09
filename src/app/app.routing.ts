import { Routes, RouterModule } from '@angular/router';

import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {ItemComponent} from './item/item.component';
import {ProfileCreateFormComponent} from './profile-create-form/profile-create-form.component';

// This is where all the routes are set
// canActivate[AuthGuard] blocks any route from any user that is not logged in
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginSuccess', component: LoginSuccessComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'item', component: ItemComponent },
  { path: 'profileCreate', component: ProfileCreateFormComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
