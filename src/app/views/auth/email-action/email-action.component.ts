import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.scss']
})
export class EmailActionComponent implements OnInit {
  changePwdForm: FormGroup;
  urlCode: string
  constructor(private formbuilder: FormBuilder, 
    private title: Title, private authservice: AuthService,
    private route: ActivatedRoute) { 
    this.title.setTitle('Action Action- filmHub')
  }

  ngOnInit() { 
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.initialiseForm()
    this.route.queryParams.subscribe((data)=>{
      this.urlCode = data['oobCode']
      console.log(data)
      console.log(this.urlCode)
    })
  }

  initialiseForm(){
    this.changePwdForm = this.formbuilder.group({
      password: [null, [Validators.required]],
      confirmpassword: [null,[Validators.required]]
    })
  }

  changePassword(formvalue){
    const pswrd = formvalue.password
    const confirmpswrd = formvalue.confirmpassword
    console.log(pswrd, confirmpswrd)
    if((pswrd === confirmpswrd) && this.urlCode != undefined){
      console.log(this.urlCode, pswrd)
      this.authservice.confirmPasswordReset(this.urlCode, pswrd).then(()=>{

      })
    }
  }

}
