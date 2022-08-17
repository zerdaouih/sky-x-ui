import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WelcomeComponent} from "./home/welcome/welcome.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterSuccessComponent} from "./register/register-success/register-success.component";
import {AuthGaurdService} from "./_helper/auth/auth-gaurd.service";
import {SearchComponent} from "./search/search.component";
import {ProviderComponent} from "./provider/provider.component";
import {Role} from "./model/role";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: WelcomeComponent, canActivate: [AuthGaurdService], data: {roles: [Role.Admin, Role.User]}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search', component: SearchComponent, canActivate: [AuthGaurdService], data: {roles: [Role.Admin, Role.User]}},
  {path: 'provider', component: ProviderComponent, canActivate: [AuthGaurdService], data: {roles: [Role.Admin]}},
  {path: 'register-success/:fullname', component: RegisterSuccessComponent},
  {path: 'not-auth', component: NotAuthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
