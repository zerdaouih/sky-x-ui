import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {EmailValidator} from "../shared/EmailValidator";
import {TokenStorageService} from "../_helper/auth/jwt/token-storage.service";
import {HeaderComponent} from "../home/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // isLoggedIn: any;
  // isLoginFailed: any;
  // errorMessage: any;
  // googleURL: any;
  // facebookURL: any;
  // githubURL: any;
  // linkedinURL: any;
  // currentUser: any;
  // form: any;


  loginForm: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private loginService: LoginService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log(' login on init >>' + JSON.stringify(this.route.snapshot.queryParams));
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('return url >>' + this.returnUrl)
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern(this.emailValidator.regex.email)]],
      password: ['', [Validators.required]]
    });
  }

  validateLogin() {
    this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      data => {
        console.log(" validate login data >>>" + JSON.stringify(data));
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(" >> this.returnURL Login >>>" + this.returnUrl)

        this.router.navigate([this.returnUrl]);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', {skipLocationChange: true});
    return this.router.navigateByUrl(url);
  }

}
