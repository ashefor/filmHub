import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase,
    private authservice: AuthService) { }

  getAllMovies(){
    return this.db.list('/allMovies').valueChanges()
  }
  getSingleMovie(id){
    return this.db.list('/allMovies', ref=> ref.orderByChild("imdbID").equalTo(id)).valueChanges()
  }
  addToFavorites(favoriteMovie){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).push(favoriteMovie).then(()=>{
      console.log('done')
    })
  }

  getFavorites(){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).valueChanges()
  }
}
