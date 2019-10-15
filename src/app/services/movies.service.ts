import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getMovie(){
    return this.http.get('http://www.omdbapi.com/?apikey=8e507b1&t=blade+runner+2049&plot=full')
  }

  getAllMovies(){
    return this.db.list('/allMovies').valueChanges()
  }
  getSingleMovie(id){
    return this.db.object(`/allMovies/${id}`).valueChanges()
  }
}
