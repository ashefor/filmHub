import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'filmHub';
  loggedInUser;
  oneUser;
  searchForm: FormGroup
  constructor(private movieservice: MoviesService, private formbuilder: FormBuilder, private authservice: AuthService, private router: Router) {
    this.searchForm = this.formbuilder.group({
      movie: ['']
    })
  }
  ngOnInit() {
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    this.authservice.currentUser.subscribe(data => {
      this.loggedInUser = data
    })
  }
  get isLoggedIn() {
    return this.authservice.isLoggedIn
  }
  logOut() {
    this.authservice.signOut().then(() => {
    })
  }
  searchForMovie(formvalue){
    this.router.navigate(['/search'], {queryParams: {s: formvalue.movie}})
  }
}
