import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {RegisterService} from "../service/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailValidator} from "../shared/EmailValidator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerUserForm: FormGroup;

  validationMessages = {
    'lastName': {
      'required': 'Late Name is required.',
    },
    'firstName': {
      'required': 'First Name is required.',
    },
    'email': {
      'required': 'Email is required.',
      'mismatch': 'Email Exists',
      'pattern': 'Please provide valid Email'
    },
    'password': {
      'required': 'Password is required.'
    },
  };

  formErrors =
    {"firstName": "", "lastName": "", "email": "", "password": ""};


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private registerService: RegisterService, private emailValidator: EmailValidator, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailValidator.regex.email)]],
        password: ['', [Validators.required]],
      },
      {
        validator: this.emailValidator.checkEmail('email'),
      }
    );
    this.registerUserForm.valueChanges.subscribe(
      value => {
        this.logValidationErrors()
      }
    );

  }

  onSubmit() {
    this.registerService.registerUser(this.registerUserForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/register-success', data.firstName + ' ' + data.lastName]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      });
  }

  logValidationErrors() {
    this.formErrors = this.emailValidator.getValidationErrors(this.registerUserForm, this.validationMessages);
  }


}
