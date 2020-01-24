import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ForgotPassword } from '../classes/forgot-password';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  changePassword(forgotPasswordCredentials: ForgotPassword) : Observable<object> {
    return this.http.post<object>('http://13.67.42.99/api/accounts/resetPassword ', forgotPasswordCredentials);
  }
}
