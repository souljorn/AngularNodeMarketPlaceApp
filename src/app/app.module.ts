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
import { routing} from "./app.routing";
import { HomeComponent } from './home/home.component';
import {JwtInterceptor} from "./jwt.interceptor";
import {AuthGuard} from "./auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginSuccessComponent,
    HomeComponent,
    ProfileComponent,
    ItemComponent

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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
