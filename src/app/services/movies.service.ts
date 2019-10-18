import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

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
  addToFavorites(favoriteMovie){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).push(favoriteMovie).then(()=>{
      console.log('done')
    })
  }
  removeFavorites(moviekey){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).remove(moviekey)
  }
  getFav(){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`)
  }
  getFavs(){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).valueChanges()
  }
  getFavorites(){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/favorites/${userid.uid}`).snapshotChanges()
  }

  searchForMovie(movie){
    return this.http.get(`http://www.omdbapi.com/?s=${movie}&apikey=8e507b1&type=movie&page=3`)
  }

  singleMovieID(id){
    return this.http.get(`https://www.omdbapi.com/?i=${id}&apikey=8e507b1`)
  }
}
