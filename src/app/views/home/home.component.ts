import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user;
  allDramas: any[] = [];
  allComedies: any[] = [];
  allActions: any[] = [];
  allHorrors: any[] = [];
  allAnimations: any[] = [];
  subsciption: Subscription
  constructor(private movieservice: MoviesService, private authservice: AuthService) { }

  ngOnInit() {
    if (this.authservice.isLoggedIn) {
      this.subsciption = this.movieservice.getAllMovies().subscribe(value => {
        if (value) {
          console.log(value)
        }
      })
    }
  }
  ngOnDestroy() {
    this.subsciption.unsubscribe()
  }
  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" }
  ];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "nextArrow": `<div class='nav-btn next-slide'></div>`,
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": true
  };
  breakpoint(e) {
    console.log('breakpoint');
  }
}
