import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {User} from "../model/user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'api/register'

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions)
      .pipe(
        catchError(null)
      );
  }

}
