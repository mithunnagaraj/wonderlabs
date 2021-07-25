import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private rootURL: String = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: Number) {
    let usersURL = this.rootURL + 'users?page=' + pageNumber;
    return this.http.get(usersURL);
  }
}
