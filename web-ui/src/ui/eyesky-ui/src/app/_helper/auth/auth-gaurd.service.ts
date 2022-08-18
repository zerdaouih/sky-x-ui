import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "../../service/login.service";
import {TokenStorageService} from "./jwt/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private loginService: LoginService, private tokenStorageService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isUserLoggedIn()) {
      console.log('1')
      if (route.data.roles) {
        console.log('1-1')
        let role: string = this.tokenStorageService.getUser()['roles'][0];
        if (route.data.roles.indexOf(role) === -1) {
          console.log('1-2')
          this.router.navigate(['/not-auth']);
          return false;
        }
      }
      console.log('2')
      return true;
    }
    // not logged in so redirect to login page with the return url
    console.log('3 >' + state.url);
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    // this.router.navigate(['/login?returnUrl=/search']);
    return false;
  }

}
