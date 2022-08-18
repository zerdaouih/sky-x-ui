import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './home/footer/footer.component';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {EmailValidator, ReactiveFormsModule} from "@angular/forms";
import {RegisterSuccessComponent} from "./register/register-success/register-success.component";
import {authInterceptorProviders} from "./_helper/auth/auth.interceptor";
import {SearchComponent} from './search/search.component';
import {ProviderComponent} from './provider/provider.component';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    SearchComponent,
    ProviderComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    EmailValidator,
    authInterceptorProviders

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
