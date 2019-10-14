import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm(){
    this.resetForm = this.formbuilder.group({
      email: ['', Validators.required]
    })
  }
}
