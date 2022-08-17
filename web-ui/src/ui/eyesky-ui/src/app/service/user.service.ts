import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from "../model/user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'api/user'

  constructor(private http: HttpClient) {
  }

  checkUserEmailExist(email: string): Observable<boolean> {
    return this.http.post<string>('api/secure/login/checkmail', email, httpOptions)
      .pipe(
        catchError(null)
      );
  }

}
