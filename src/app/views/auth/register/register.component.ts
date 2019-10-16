import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  diffpasswords: boolean = false;
  constructor(private formbuilder: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      // checked: ['', Validators.required]
    })
  }

  register(formValues) {
    if (this.registerForm && this.registerForm.valid) {
      const pwd1 = this.registerForm.get('password').value
      const pwd2 = this.registerForm.get('confirmPassword').value
      if (pwd1 === pwd2) {
        this.authservice.signUp(formValues.username, formValues.email, formValues.password)
      } else {
        this.diffpasswords = true;
        console.log('not match')
      }
    }
  }

  clearpwdError(e) {
    if (this.diffpasswords) {
      this.diffpasswords = false
    }
  }

  validateUserName() {
    return this.registerForm.get('username').valid || this.registerForm.get('username').untouched
  }

  validateEmail() {
    return this.registerForm.get('email').valid || this.registerForm.get('email').untouched
  }

}
