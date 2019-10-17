import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  allFavMovies = []
  newFav: Observable<any>
  constructor(private authservice: AuthService, private movieservice: MoviesService) { }

  ngOnInit() {
    if(this.authservice.isLoggedIn){
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if(loggeduser.uid){
        console.log(loggeduser.uid)
        this.movieservice.getFavs().subscribe((data: any)=>{
          this.allFavMovies = data;
          console.log(this.allFavMovies)
          // if(this.allFavMovies.some(id=> id.imdbID === this.movieId)){
          //   this.hasFavorite = true;
          // }else{
          //   this.hasFavorite = false
          // }
        })
      }
    }
  }

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: `<div class="nav-btn next-slide">
    <i class="fa fa-angle-right f-50"></i>
    </div>`,
    prevArrow: `<div class="nav-btn prev-slide">
    <i class="fa fa-angle-left f-50"></i>
    </div>`,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: false,
          // autoplay: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          // autoplay: true,
          dots: false
        }
      }
    ]
  };
  breakpoint(e) {
    console.log('breakpoint');
  }

}
