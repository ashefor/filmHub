import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrNotificationService } from './toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  redirectUrl: string
  public currentUserSubject = new BehaviorSubject({})
  currentUser = this.currentUserSubject.asObservable()
  constructor(private auth: AngularFireAuth, private router: Router, private toastr: ToastrNotificationService) {
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'))
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'))
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
      }
    })
  }

  signUp(username, email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password).then((value) => {
      if (value) {
        return value.user.updateProfile({
          displayName: username
        }).then(() => {
          localStorage.setItem('user', JSON.stringify(value.user));
          JSON.parse(localStorage.getItem('user'))
          this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
          this.router.navigate(['/home'])
        })
      }
    }).catch((err: any) => {
      if(err.code === "auth/too-many-requests"){
        this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
        }
        console.log(err.message)
        this.toastr.errorToaster(err.message)
    })
  }

  signIn(email, password) {
    this.auth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      if (value) {
        localStorage.setItem('user', JSON.stringify(value.user));
        JSON.parse(localStorage.getItem('user'))
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
        this.router.navigate(['/home'])
      }
    }).catch((err:any)=>{
      if(err.code === "auth/too-many-requests"){
      this.toastr.errorToaster('Too many unsuccessful login attempts. Please try again later')
      }
      console.log(err.message)
      this.toastr.errorToaster(err.message)
    })
  }

  sendVerificationMail() {
    this.auth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['/auth/verify-email'])
    })
  }
  signOut() {
    localStorage.clear()
    this.auth.auth.signOut()
    return this.router.navigate(['/auth/login'])
  }
  resetPassword(email){
    return this.auth.auth.sendPasswordResetEmail(email).then().catch((err:any)=>{
      if(err.code === "auth/too-many-requests"){
        this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
        }
        console.log(err.message)
        this.toastr.errorToaster(err.message)
    })
  }
  confirmPasswordReset(code, password){
    return this.auth.auth.confirmPasswordReset(code, password).then(()=>{
      this.router.navigate(['/auth/login'])
    }).catch((err:any)=>{
      if(err.code === "auth/too-many-requests"){
        this.toastr.errorToaster('Too many unsuccessful attempts. Please try again later')
        }
        console.log(err.message)
        this.toastr.errorToaster(err.message)
    })
  }
  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user != null && user.emailVerified !== false) ? true: false;
    return user != null;
  }
}
