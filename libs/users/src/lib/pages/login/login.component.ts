import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'bluebits-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm?: FormGroup;
    isSubmitted?: boolean;
    authError: boolean;
    authMessage: string;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private localStorageService: LocalStorageService,
                private router: Router
    ) {}

    ngOnInit(): void {
      this.initForm();
    }

    initForm() {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    }

  onSubmit() {
      this.isSubmitted = true;

      if (this.loginForm?.invalid) {
        return;
      }

      this.authService.login(this.loginForm?.value).subscribe(({token}: {email: string, token: string}) => {
        this.authError = false;
        this.localStorageService.setToken(token);
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        this.authError = true;

        if (error.status !== 400) {
          this.authMessage = 'Error in the server, please try again later'
        } else {
          this.authMessage = 'Email or Password are wrong'
        }
      });
  }
}
