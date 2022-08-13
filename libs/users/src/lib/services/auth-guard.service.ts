import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate() {
    const token = this.localStorageService.getToken;

    if (token) {
      // Decode token that we store in local storage and get information that are encoded in this token
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp)) {
        return true;
      }
    }

    this.router.navigate(['/login']);

    return false;
  }

  private tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
