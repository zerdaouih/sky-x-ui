import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    return this.http.get<string>('api/secure/login/checkmail/' + email)
      .pipe(
        catchError(null)
      );
  }

}
