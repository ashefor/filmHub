import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  diffpasswords: boolean = false;
  psswd;
  constructor(private formbuilder: FormBuilder,
    private title: Title, 
    private router: Router,
    private toastr: ToastrNotificationService,
    private authservice: AuthService) { 
      this.title.setTitle('Register - filmHub')
    }

  ngOnInit() {
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      // checked: ['', Validators.required]
    })
  }
  register(formValues) {
    if (this.registerForm && this.registerForm.valid) {
      const pwd1 = this.registerForm.get('password').value
      const pwd2 = this.registerForm.get('confirmPassword').value
      if (pwd1 === pwd2) {
        this.loading = true;
        this.authservice.signUp(formValues.username, formValues.email, formValues.password).then(()=>{
          this.router.navigate(['/home'])

        }).catch((err: any) => {
          this.loading = false
          if(err.code === "auth/too-many-requests"){
            this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
            }
            console.log(err.message)
            this.toastr.errorToaster(err.message)
        })
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
  get email(){
    return this.registerForm.get('email')
  }
  get username(){
    return this.registerForm.get('username')
  }
  get password(){
    return this.registerForm.get('password')
  }

}
