import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { faSearch, faBell, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

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
  public safeImg: SafeResourceUrl
  constructor(private movieservice: MoviesService, private route: ActivatedRoute, private authservice: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.authservice.isLoggedIn){
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
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if(loggeduser.uid){
        console.log(loggeduser.uid)
        this.movieservice.getFavorites().subscribe(data=>{
          console.log(data)
        })
      }
    }
  }
  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
    }
  }

  addToFavorites(){
    if(!this.hasFavorite){
      console.log(this.movieData[0])
    this.movieservice.addToFavorites(this.movieData[0]).then((res)=>{
      this.hasFavorite = true;
    })
    }
  }
}
