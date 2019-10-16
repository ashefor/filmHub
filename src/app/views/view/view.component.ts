import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  movieId: string;
  movieData: any;
  subsciption: Subscription
  public safeImg: SafeResourceUrl
  constructor(private movieservice: MoviesService, private route: ActivatedRoute, private authservice: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.authservice.isLoggedIn){
      this.route.params.subscribe((data: Params)=>{
        this.movieId = data['id']
        this.subsciption = this.movieservice.getSingleMovie(this.movieId).subscribe((data: any)=>{
          if(data){
            console.log(data)
            this.movieData = data;
            this.safeImg = this.sanitizer.bypassSecurityTrustStyle(`url(${this.movieData[0].Poster})`)
            // console.log(this.safeImg)
            console.log(this.movieData)
          }
        })
      })
    }
  }
  getUrl(){
    return `url(${this.safeImg})`
  }
  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
    }
  }
}
