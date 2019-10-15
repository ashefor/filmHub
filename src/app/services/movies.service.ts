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

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getAllMovies(){
    return this.db.list('/allMovies').valueChanges()
  }
  getSingleMovie(id){
    return this.db.list('/allMovies', ref=> ref.orderByChild("imdbID").equalTo(id)).valueChanges()
  }
}
