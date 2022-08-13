import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UserInterface } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import {UsersFacade} from "../state/users.facade";
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string;

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    this.apiUrl = `${environment.apiUrl}/users`;
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUrl);
  }

  getUser(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.apiUrl, user);
  }

  updateUser(id: string, user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  getUsersCount() {
    return this.http.get<{count: number}>(`${this.apiUrl}/get/count`)
      .pipe(
        map(({count}: {count: number}) => count)
      )
  }

  initUserSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
