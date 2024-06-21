import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private data: DataService) {}

  register(body: {}) {
    return this.http.post(environment.URL + 'auth/admin/register', body);
  }
  login(body: {}) {
    return this.http
      .post(environment.URL + 'auth/admin/login', body)
      .pipe(map((value: any) => value['data']));
  }
}
