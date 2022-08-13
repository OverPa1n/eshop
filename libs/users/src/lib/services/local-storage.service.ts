import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  get getToken(): string {
    return localStorage.getItem(TOKEN_KEY) as string;
  }

  get getUserIdFromToken() {
    const token = this.getToken;

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      return tokenDecode?.userId;
    } else {
      return null;
    }
  }

  setToken(data: string) {
    localStorage.setItem(TOKEN_KEY, data)
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isValidToken() {
    const token = this.getToken;

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      return !this.tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  private tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
