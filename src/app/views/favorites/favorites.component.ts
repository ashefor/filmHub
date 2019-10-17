import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable } from 'rxjs';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  allFavMovies = [];
  uniquearr = []
  faEye = faEye;
  faHeart = faHeart;
  newFav: Observable<any>
  constructor(private authservice: AuthService, private movieservice: MoviesService) { }

  ngOnInit() {
    if(this.authservice.isLoggedIn){
      const loggeduser = JSON.parse(localStorage.getItem('user'))
      if(loggeduser.uid){
        console.log(loggeduser.uid)
        this.movieservice.getFavorites().subscribe((data:any)=>{
          data.forEach(element => {
            this.allFavMovies.push({key: element.key,...element.payload.val()})
            const arr = [];
              let arr2 = []
            this.allFavMovies.forEach(elem=>{
              arr.push(JSON.stringify(elem))
              // console.log(arr)
              arr2 = Array.from(new Set(arr))
              console.log(arr2)
              const arra = []
              arr2.forEach(elem=>{
                console.log(JSON.parse(elem))
                this.uniquearr.push(JSON.parse(elem));
                const arrr: Array<any> =  new Array
                arra.push(JSON.parse(elem))
                console.log(arra)
              })
              this.uniquearr = arra;
              console.log(this.uniquearr)
            })
          });
        })
      }
    }
  }
  remove(key){
    this.movieservice.removeFavorites(key).then(()=>{
      const index = this.uniquearr.findIndex((id)=>id.key === key)
      console.log(index)
      this.uniquearr.splice(index, 1)
    })
  }

}
