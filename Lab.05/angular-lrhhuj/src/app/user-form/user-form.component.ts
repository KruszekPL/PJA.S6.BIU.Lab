import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('cPassword');
  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }
  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }
  return { 'matchPasswords': true };
}

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  passwordMessages = {
    matchPasswords: 'Passwords don\'t match',
    pattern: 'Password is invalid'
  };

  matchPasswordsMsg;
  passwordPatternMsg;
  phoneFormatMsg;
  tokenMsg;

  userForm: FormGroup;
  userExists = false;
  tokenCorrect = true;
  constructor(private formBuilder: FormBuilder) { }

  phoneRequired(c: AbstractControl): { [key: string]: boolean } | null {
    return { 'phoneRequired': this.userForm.get('authorization').value === 'phone' };
  }
  ngOnInit() {

    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.email]],
      phone: ['', [
        Validators.pattern('[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}')]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      authorization: ['', []],
      token: ['', []],
      pswdGroup: this.formBuilder.group({
        password: ['', [Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')]],
        cPassword: ['', [Validators.required]]
      }, {
          validator: passwordMatcher
        })
    });

    const phone = this.userForm.get('phone');
    phone.valueChanges.debounceTime(500).subscribe(value => {
      this.phoneFormatMsg = '';

      if ((phone.touched || phone.dirty) && phone.getError('pattern')) {
        this.phoneFormatMsg = 'Invalid format!';
      }
    });

    const email = this.userForm.get('email');
    this.userForm.get('authorization').valueChanges.subscribe(value => {
      if (value === 'phone') {
        phone.setValidators([Validators.required, Validators.pattern('[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}')]);
        email.setValidators([Validators.email]);
      } else {
        phone.setValidators([Validators.pattern('[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}')]);
        email.setValidators([Validators.required, Validators.email]);
      }
      phone.updateValueAndValidity();
      email.updateValueAndValidity();
    });

    this.userForm.get('username').valueChanges.debounceTime(1000).subscribe(value => {
      if (value === 'admin') {
        this.userExists = true;
      } else {
        this.userExists = false;
      }
    });

    const passwordGroup = this.userForm.get('pswdGroup');
    const password = this.userForm.get('pswdGroup.password');
    password.valueChanges.debounceTime(500).subscribe(value => {
      this.passwordPatternMsg = '';
      if ((password.touched || password.dirty) && password.getError('pattern')) {
        this.passwordPatternMsg = this.passwordMessages['pattern'];
      }
    });

    const confirmPassword = this.userForm.get('pswdGroup.cPassword');
    confirmPassword.valueChanges.debounceTime(500).subscribe(value => {
      this.matchPasswordsMsg = '';

      if ((confirmPassword.touched || confirmPassword.dirty) && passwordGroup.getError('matchPasswords')) {
        this.matchPasswordsMsg = this.passwordMessages['matchPasswords'];
      }
    });


    this.userForm.get('token').valueChanges.debounceTime(500).subscribe(value => {

      if (value === '123abc') {
        this.tokenCorrect = true;
      } else {
        this.tokenCorrect = false;
      }
    });
  }

  populateTestData() {
    this.userForm.patchValue({
      email: 'jkowal@wp.pl',
      username: 'jkowal'
    });
  }
}
