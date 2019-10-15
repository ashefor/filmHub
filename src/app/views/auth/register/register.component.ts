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
  constructor(private formbuilder: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      checked: ['', Validators.required]
    })
  }

  register(formValues) {
    if (this.registerForm && this.registerForm.valid) {
      const pwd1 = this.registerForm.get('password').value
      const pwd2 = this.registerForm.get('confirmPassword').value
      if (pwd1 === pwd2) {
       this.authservice.signUp(formValues.username, formValues.email, formValues.password)
      }else{
        console.log('not match')
      }
    }
  }
}
