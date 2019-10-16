import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component'



@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    ResetPasswordComponent, VerifyEmailComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'reset-password', component: ResetPasswordComponent
      }
    ])
  ]
})
export class AuthModule { }
