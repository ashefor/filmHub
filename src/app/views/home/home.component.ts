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
  loading: boolean = true
  allDramas: any[] = [];
  allComedies: any[] = [];
  allActions: any[] = [];
  allHorrors: any[] = [];
  allAnimations: any[] = [];
  otherMovies: any[] = [];
  allMovies = [];
  testArr = []
  subsciption: Subscription
  constructor(private movieservice: MoviesService, private authservice: AuthService) { }

  ngOnInit() {
    let navbar = document.querySelector('#navbarText')
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
    if (this.authservice.isLoggedIn) {
      this.subsciption = this.movieservice.getAllMovies().subscribe(value => {
        if (value) {
          this.allMovies = value;
          let actionArr: Array<any> = new Array()
          let animationArr: Array<any> = new Array()
          let comedyArr: Array<any> = new Array()
          let dramaArr: Array<any> = new Array()
          let horrorArr: Array<any> = new Array()
          let othersArr: Array<any> = new Array()
          this.allMovies.forEach((elem) => {
            if (elem.Genre.includes("Action")) {
              actionArr.push(elem)
            }
            if (elem.Genre.includes("Animation")) {
              animationArr.push(elem)
            }
            if (elem.Genre.includes("Comedy")) {
              comedyArr.push(elem)
            }
            if (elem.Genre.includes("Drama")) {
              dramaArr.push(elem)
            }
            if (elem.Genre.includes("Horror")) {
              horrorArr.push(elem)
            }
          })
          this.allActions.push(actionArr)
          this.allAnimations.push(animationArr)
          this.allComedies.push(comedyArr)
          this.allDramas.push(dramaArr)
          this.allHorrors.push(horrorArr)
          this.loading = false
        }
      }, err => {
        this.loading = false;
      })
    }
  }
  ngOnDestroy() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
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
}
