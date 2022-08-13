import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
    this.apiUrl = `${environment.apiUrl}/users`;
  }

  login(payload: {email: string, password: string}): Observable<{email: string, token: string}> {
    return this.http.post<{email: string, token: string}>(`${this.apiUrl}/login`, payload);
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(['/login'])
  }
}
