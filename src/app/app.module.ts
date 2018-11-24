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
import { JwtInterceptor} from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './item/item.component';
import { UserService } from './user.service';
import { ItemService } from './item.service';
import { SearchItemByTitleComponent } from './search-item-by-title/search-item-by-title.component';
import { ItemCardsComponent } from './item-cards/item-cards.component';
import { ProfileCreateFormComponent } from './profile-create-form/profile-create-form.component';
import { UploadItemComponent } from './upload-item/upload-item.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { MessengerComponentComponent } from './messenger-component/messenger-component.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { CompareValidatorDirective } from './shared/compare-validator.directive';


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
    UploadItemComponent,
    ProfileCreateFormComponent,
    ItemPageComponent,
    ModalLoginComponent,
    ItemPageComponent,
    MessengerComponentComponent,
    GooglemapComponent,
    CompareValidatorDirective

  ],
  imports: [
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDYznE2GHWNmS6Li95YZan8LOPX1P0Kab4',
    })
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
