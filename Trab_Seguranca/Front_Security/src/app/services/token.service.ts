import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  response!:boolean;
  apiURl: string = 'http://localhost:3000'
  data: {secret: string,otp: number} = {
    secret: "e7428e736fa7f849204a64310ba05252",
    otp: 0
  }
  constructor(private http: HttpClient) { }

  validar(OTP: number): Observable<any>{
    this.data.otp = OTP

   return this.http.post<any>(this.apiURl + '/otp/validate',this.data,{

      headers: {

        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

  }
}
