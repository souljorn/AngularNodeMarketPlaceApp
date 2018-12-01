import { Routes, RouterModule } from '@angular/router';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {ItemComponent} from './item/item.component';
import {ProfileCreateFormComponent} from './profile-create-form/profile-create-form.component';
import {UploadItemComponent} from './upload-item/upload-item.component';
import {GooglemapComponent} from './googlemap/googlemap.component';
import {ItemPageComponent} from './item-page/item-page.component';
import {MessengerComponentComponent} from './messenger-component/messenger-component.component';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {ChatComponent} from './chat/chat.component';

// This is where all the routes are set
// canActivate[AuthGuard] blocks any route from any user that is not logged in
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginSuccess', component: LoginSuccessComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'item', component: ItemComponent },
  {path: 'admin', component:AdminDashboardComponent },
  { path: 'profileCreate', component: ProfileCreateFormComponent },
  { path: 'itemCreate', component: UploadItemComponent},
  { path: 'itemPage', component: ItemPageComponent},
  { path: 'messenger', component: MessengerComponentComponent},
  { path: 'map', component:GooglemapComponent},
  { path: 'chat', component:ChatComponent},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
