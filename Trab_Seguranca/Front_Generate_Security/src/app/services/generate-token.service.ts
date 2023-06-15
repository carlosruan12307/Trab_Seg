import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGenerateToken } from '../interfaces/response-generate-token';
@Injectable({
  providedIn: 'root',
})
export class GenerateTokenService {
  response!: boolean;
  apiURl: string = 'http://localhost:8080';
  data: { secret: string } = {
    secret: 'e7428e736fa7f849204a64310ba05252',
  };
  constructor(private http: HttpClient) {}

  generate(): Observable<ResponseGenerateToken> {
    return this.http.post<ResponseGenerateToken>(
      this.apiURl + '/gerarOTP',
      this.data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
