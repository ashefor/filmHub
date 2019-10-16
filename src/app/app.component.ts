import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'filmHub';
  loggedInUser;
  oneUser;
  constructor(private movieservice: MoviesService, private authservice: AuthService){
    
  }
  ngOnInit(){
    this.authservice.currentUser.subscribe(data=>{
      this.loggedInUser = data
    })
  }
  get isLoggedIn(){
    return this.authservice.isLoggedIn
  }
  logOut(){
    this.authservice.signOut().then(()=>{
      console.log('loged out')
    })
  }
  
}
