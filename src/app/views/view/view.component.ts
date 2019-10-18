import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SafeResourceUrl, DomSanitizer, Title } from '@angular/platform-browser';
import { faSearch, faHeartbeat, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faHeartbeat = faHeartbeat;
  loading: boolean = true;
  faChevronCircleDown = faChevronCircleDown;
  movieId: string;
  movieData = [];
  movieObject;
  subsciption: Subscription;
  hasFavorite;
  allFavMovies = []
  newmov = []
  @ViewChild('target', {static:false}) scrooller: ElementRef<HTMLElement>
  public safeImg: SafeResourceUrl
  constructor(private movieservice: MoviesService, 
    private title: Title,
    private route: ActivatedRoute, private authservice: AuthService, private sanitizer: DomSanitizer) {
      this.title.setTitle('Movie Details - filmHub')
   }

  ngOnInit() {
    window.scrollTo(0,0)
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
          });
          if (this.newmov.sort().some(objectid => objectid.imdbID === this.movieId)) {
            this.hasFavorite = true;
          } else {
            this.hasFavorite = false
          }
        })

      }
      this.route.params.subscribe((data: Params) => {
        this.movieId = data['id']
        const subsciption = this.movieservice.getSingleMovie(this.movieId).subscribe((data: any) => {
          if (data) {
            if(data.length === 1){
            this.movieData = data;
              this.safeImg = this.sanitizer.bypassSecurityTrustStyle(`url(${this.movieData[0].Poster})`)
              this.loading = false
            }else{
              const moviesearch = this.movieservice.singleMovieID(this.movieId).subscribe(data=>{
              if(data){
                this.movieData.push(data);
                this.safeImg = this.sanitizer.bypassSecurityTrustStyle(`url(${this.movieData[0].Poster})`)
                this.loading = false
              }
              this.subsciption.add(moviesearch)
              })
            }
          }
        }, (err: any) => {
          this.loading = false
        })
        this.subsciption.add(subsciption)
      })
    }
  }
  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
    }
  }

  addToFavorites() {
    if (!this.hasFavorite) {
      const found = this.newmov.findIndex((id => id.imdbID === this.movieId))
      if (found === -1) {
        this.movieservice.addToFavorites(this.movieData[0]).then(() => {
          this.hasFavorite = true;
        })
      }
    } else {
      const found = this.newmov.find((id => id.imdbID === this.movieId)).key
      this.movieservice.removeFavorites(found).then(() => {
        const index = this.newmov.findIndex((id => id.imdbID === this.movieId))
        this.newmov.splice(index, 1)
        this.hasFavorite = false;
      })
    }
  }

  scrolldown(){
    this.scrooller.nativeElement.scrollIntoView()
  }
}
