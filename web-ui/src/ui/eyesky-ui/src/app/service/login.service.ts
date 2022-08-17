import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../_helper/auth/jwt/token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'api/secure/login'

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  login(email: string, password: string): Observable<any> {
    console.log(email)
    console.log(password)
    return this.http.post(this.url, {
      email: email,
      password: password
    }, httpOptions);
  }

  isUserLoggedIn() {
    console.log('isUserLoggedIn >>' + this.tokenStorageService.getUser())
    return (this.tokenStorageService.getUser() !== null)
  }

  logOut() {
    this.tokenStorageService.signOut();
  }

}
