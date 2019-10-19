import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

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
  constructor(private formbuilder: FormBuilder, 
    private title: Title,
    private router: Router,
    private toastr: ToastrNotificationService,
    private authservice: AuthService) { 
      this.title.setTitle('Login - filmHub')
    }

  ngOnInit() {
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
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
    this.loading = true;
    this.authservice.signIn(formValues.email, formValues.password).then(() => {
        this.router.navigate(['/home'])
    }).catch((err:any)=>{
      this.loading = false
      if(err.code === "auth/too-many-requests"){
      this.toastr.errorToaster('Too many unsuccessful login attempts. Please try again later')
      }
      console.log(err.message)
      this.toastr.errorToaster(err.message)
    })

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
