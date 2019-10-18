import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private route: ActivatedRoute, private authservice: AuthService, private movieservice: MoviesService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    if (this.authservice.isLoggedIn) {
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if (loggeduser.uid) {
        this.subsciption = this.movieservice.getFavorites().subscribe((data: any) => {
          this.allFavMovies = data;
          data.forEach(element => {
            this.newmov.push({ key: element.key, ...element.payload.val() })
            console.log(this.newmov)
          });
        })
        this.route.queryParams.subscribe((data: Params) => {
          this.searchParam = data['s']
          console.log(this.searchParam)
          this.subscription = this.movieservice.searchForMovie(this.searchParam).subscribe((data: any) => {
            if (data) {
              this.loading = false;
              console.log(data)
              if (data.Response === 'True') {
                this.searchResults = data.Search
                // console.log(this.searchResults)
                this.searchResults.forEach((elem: any) => {
                  console.log(elem.imdbID)
                  // console.log(this.newmov)
                  if (this.newmov.some(objectid => objectid.imdbID === elem.imdbID)) {
                    this.hasFavorite = false;
                    console.log(elem)
                    console.log('has favd')
                  } else {
                    // this.hasFavorite = false
                  }
                })
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
