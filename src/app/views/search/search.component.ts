import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchParam: string;
  searchResults: [];
  loading: boolean = true;
  subscription: Subscription
  subsciption: Subscription;
  allFavMovies: any;
  newmov = [];
  movieId: any;
  hasFavorite: boolean = false;
  nomovie: boolean;
  result: any;
  constructor(private route: ActivatedRoute, 
    private title: Title,
    private authservice: AuthService, private movieservice: MoviesService) {
      this.title.setTitle('Search - filmHub')
     }

  ngOnInit() {
    window.scrollTo(0, 0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    if (this.authservice.isLoggedIn) {
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if (loggeduser.uid) {
        this.route.queryParams.subscribe((data: Params) => {
          this.searchParam = data['s']
          navbar.classList.remove('show')
          this.subscription = this.movieservice.searchForMovie(this.searchParam).subscribe((data: any) => {
            if (data) {
              console.log(data)
              this.loading = false;
              if(data.Response === 'False'){
                this.nomovie = true;
              this.result = data.Error;
              console.log(this.result)
              }
              if (data.Response === 'True') {
                this.nomovie = false;
                this.searchResults = data.Search
                console.log(this.searchResults)
              }
            }
          })
        })
      }

    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  remove(e){

  }
}
