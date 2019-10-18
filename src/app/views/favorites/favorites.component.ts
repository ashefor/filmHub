import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable, Subscription } from 'rxjs';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  allFavMovies = [];
  uniquearr = []
  faEye = faEye;
  faHeart = faHeart;
  noMovies: boolean
  loading: boolean = true;
  newFav: Observable<any>
  subscription: Subscription;
  constructor(private authservice: AuthService, private movieservice: MoviesService) { }

  ngOnInit() {
    window.scrollTo(0,0)
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    if (this.authservice.isLoggedIn) {
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if (loggeduser.uid) {
        this.subscription = this.movieservice.getFavorites().subscribe((data: any) => {
          if (data) {
            if(data.length === 0){
              console.log('none')
              this.noMovies = true;
            }
            data.forEach(element => {
              this.allFavMovies.push({ key: element.key, ...element.payload.val() })
              const arr = [];
              let arr2 = []
              this.allFavMovies.forEach(elem => {
                arr.push(JSON.stringify(elem))
                arr2 = Array.from(new Set(arr))
                const arra = []
                arr2.forEach(elem => {
                  this.uniquearr.push(JSON.parse(elem));
                  arra.push(JSON.parse(elem))
                })
                this.uniquearr = arra;
              })
            });
            this.loading = false;
          }
        }, (err: any) => {
          this.loading = false;
        })
      }
    }
  }
  remove(key) {
    this.movieservice.removeFavorites(key).then(() => {
      const index = this.uniquearr.findIndex((id) => id.key === key)
      this.uniquearr.splice(index, 1)
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
