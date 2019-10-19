import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.scss']
})
export class EmailActionComponent implements OnInit {
  changePwdForm: FormGroup;
  urlCode: string
  loading: boolean = false;
  diffpasswords: boolean = false;
  constructor(private formbuilder: FormBuilder,
    private title: Title,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private route: ActivatedRoute) {
    this.title.setTitle('Action Action- filmHub')
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.initialiseForm()
    this.route.queryParams.subscribe((data) => {
      this.urlCode = data['oobCode']
      console.log(data)
      console.log(this.urlCode)
    })
  }

  initialiseForm() {
    this.changePwdForm = this.formbuilder.group({
      password: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required]]
    })
  }

  clearpwdError(e) {
    if (this.diffpasswords) {
      this.diffpasswords = false
    }
  }

  changePassword(formvalue) {
    const pswrd = formvalue.password
    const confirmpswrd = formvalue.confirmpassword
    console.log(pswrd, confirmpswrd)
    if ((pswrd === confirmpswrd)) {
      this.loading = true;
      if (this.urlCode != undefined) {
        console.log(this.urlCode, pswrd)
        // this.loading = true;
        this.authservice.confirmPasswordReset(this.urlCode, pswrd).then(() => {
        }).catch((err: any) => {
          this.loading = false;
          if (err.code === "auth/too-many-requests") {
            this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
          }
          console.log(err.message)
          this.toastr.errorToaster(err.message)
        })
      } else if (this.urlCode == undefined) {
        this.loading = false;
        this.toastr.errorToaster('Reset code is undefined')
      }
    } else {
      this.loading = false;
      this.diffpasswords = true;
      console.log('not match')
    }
  }

}
