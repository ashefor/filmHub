import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  checked: boolean = false;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.required],
      checked: [this.checked]
    })
  }

  keepLoggedIn(e) {
    this.checked = e.target.checked
  }
  togglePwd(){
    this.hide = !this.hide
  }
}
