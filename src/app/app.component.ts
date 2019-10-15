import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'filmHub';

  constructor(private movieservice: MoviesService, private authservice: AuthService){

  }
  ngOnInit(){
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
