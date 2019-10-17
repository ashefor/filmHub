import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { faSearch, faBell, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faBell = faBell;
  loading: boolean = true;
  faChevronCircleDown = faChevronCircleDown;
  movieId: string;
  movieData: any;
  subsciption: Subscription;
  hasFavorite;
  allFavMovies = []
  newmov = []
  public safeImg: SafeResourceUrl
  constructor(private movieservice: MoviesService, private route: ActivatedRoute, private authservice: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.authservice.isLoggedIn){
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if(loggeduser.uid){
        this.movieservice.getFavorites().subscribe((data:any)=>{
          this.allFavMovies = data;
          data.forEach(element => {
            console.log(element.type)
            this.newmov.push({key: element.key,...element.payload.val()})
            console.log(this.newmov.sort())
          });
          if(this.newmov.sort().some(objectid => objectid.imdbID === this.movieId)){
            this.hasFavorite = true;
            // console.log(this.newmov.key)
          }else{
            this.hasFavorite = false
          }
        })

      }
      this.route.params.subscribe((data: Params)=>{
        this.movieId = data['id']
        this.subsciption = this.movieservice.getSingleMovie(this.movieId).subscribe((data: any)=>{
          if(data){
            this.movieData = data;
            this.safeImg = this.sanitizer.bypassSecurityTrustStyle(`url(${this.movieData[0].Poster})`)
           this.loading = false
          }
        }, (err:any)=>{
          this.loading = false
        })
      })
    }
  }
  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
    }
  }

  addToFavorites(){
    // console.log(this.movieData[0])
    if(!this.hasFavorite){
    this.movieservice.addToFavorites(this.movieData[0]).then(()=>{
      this.hasFavorite = true;
      console.log('added')
    })
    }else{
      this.hasFavorite = false
      console.log('removed')
      const found = this.newmov.find((id=>id.imdbID === this.movieId)).key
      this.movieservice.removeFavorites(found).then(()=>{
        this.hasFavorite = false;
        console.log('removed')
      })
    }
  }
}
