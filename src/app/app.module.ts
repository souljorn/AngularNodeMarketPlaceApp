import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DataService } from './data.service';
import { AuthenticationService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { routing} from './app.routing';
import { HomeComponent } from './home/home.component';
import {JwtInterceptor} from './jwt.interceptor';
import {AuthGuard} from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './item/item.component';
import {UserService} from './user.service';
import {ItemService} from './item.service';
import { SearchItemByTitleComponent } from './search-item-by-title/search-item-by-title.component';
import { ItemCardsComponent } from './item-cards/item-cards.component';
import { ProfileCreateFormComponent } from './profile-create-form/profile-create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginSuccessComponent,
    HomeComponent,
    ProfileComponent,
    ItemComponent,
    SearchItemByTitleComponent,
    ItemCardsComponent,
    ProfileCreateFormComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    DataService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
