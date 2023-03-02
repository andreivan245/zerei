import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component'
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor'; 
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { DetailsComponent } from './components/details/details.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PerfilComponent } from './components/perfil/perfil.component';

import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
    PerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GaugeModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    NgxPaginationModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
    ModalModule,
    CarouselModule

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue:{
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '601865469645-9571oi12kmgh7srkj4nsluqlf0ql93g2.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    AuthService,
    BsModalService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
