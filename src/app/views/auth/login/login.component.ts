import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loading: boolean = false;
  loginForm: FormGroup;
  checked: boolean = false;
  constructor(private formbuilder: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      checked: [this.checked]
    })
  }
  login(formValues){
    console.log(formValues.email, formValues.password)
    this.authservice.signIn(formValues.email, formValues.password)
  }
  keepLoggedIn(e) {
    this.checked = e.target.checked
  }
  togglePwd(){
    this.hide = !this.hide
  }
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
