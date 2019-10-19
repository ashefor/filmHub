import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading: boolean = false;
  passwordsent: boolean = false;
  constructor(private formbuilder: FormBuilder, 
    private title: Title, 
    private router: Router,
    private toastr: ToastrNotificationService,
    private authservice: AuthService) { 
    this.title.setTitle('Reset Password - filmHub')
  }

  ngOnInit() { 
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.initialiseForm()
  }

  initialiseForm(){
    this.resetForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  resetPassword(formvalue){
    console.log(formvalue.email)
    this.loading = true;
    this.authservice.resetPassword(formvalue.email).then(()=>{
      this.passwordsent = true;
    }).catch((err:any)=>{
      this.loading = false;
      if(err.code === "auth/too-many-requests"){
        this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
        }
        console.log(err.message)
        this.toastr.errorToaster(err.message)
    })
  }
}
