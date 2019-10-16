import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  public currentUserSubject = new BehaviorSubject({})
  currentUser = this.currentUserSubject.asObservable()
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user
        console.log(this.user)
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'))
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'))
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
      }
    })
  }

  signUp(username, email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password).then((value) => {
      if (value){
        return value.user.updateProfile({
          displayName: username
        }).then(()=>{
          localStorage.setItem('user', JSON.stringify(value.user));
          JSON.parse(localStorage.getItem('user'))
          this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
          this.router.navigate(['/home'])
        })
      }
    }).catch((err: HttpErrorResponse) => {
      console.log(err.message)
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
    }).catch((err) => {
      console.log(err.message)
    })
  }

  sendVerificationMail(){
    this.auth.auth.currentUser.sendEmailVerification().then((data)=>{
      this.router.navigate(['/auth/verify-email'])
    })
  }
  signOut() {
    localStorage.clear()
    this.auth.auth.signOut()
    return this.router.navigate(['/auth/login'])
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user != null && user.emailVerified !== false) ? true: false;
    return user != null;
  }
}
