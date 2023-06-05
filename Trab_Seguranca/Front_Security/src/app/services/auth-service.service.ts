import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  LoggedIn: boolean = false;
  userData:any;
  apiURL: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }


  login(user: FormGroup): Observable<any> {
    console.log(
      window.btoa(`${user.get('email')?.value}:${user.get('password')?.value}`)
    );
    return this.http.get<any>(this.apiURL + '/login', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(
          `${user.get('email')?.value}:${user.get('password')?.value}`
        )}`,
      },
    });
  }
}
