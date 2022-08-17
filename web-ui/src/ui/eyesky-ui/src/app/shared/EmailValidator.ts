import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from "@angular/core";
import {RegisterService} from "../service/register.service";
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {

  public regex = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  }

  constructor(private userService: UserService) {
  }

  /* static */
  checkEmail(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.valid && control.value && control.value !== null && control.value !== '') {
        this.userService.checkUserEmailExist(control.value).subscribe(exist => {
          if (exist == true) {
            control.setErrors({mismatch: true})
          }
        });
      }
    }
  }

  getValidationErrors(group: FormGroup, validationMessages: Object): any {
    var formErrors = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        let groupError = this.getValidationErrors(abstractControl, validationMessages);
        formErrors = {...formErrors, ...groupError}
      }
    });
    return formErrors
  }
}
